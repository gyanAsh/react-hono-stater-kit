import { Hono } from "hono";
import {
  decodeIdToken,
  generateCodeVerifier,
  generateState,
  Google,
  OAuth2Tokens,
} from "arctic";
import { getCookie, setCookie } from "hono/cookie";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { createUserDBFunc, getUserDBFunc } from "@/db/funtions/users";
import { createJWT } from "@/utils";
import { nanoid } from "nanoid";
const google = new Hono();

const google_obj = new Google(
  Bun.env.GOOGLE_CLIENT_ID!,
  Bun.env.GOOGLE_CLIENT_SECRET!,
  `${Bun.env.BACKEND_URL}/auth/google/callback`,
);

google.get("/", async (c) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google_obj.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  setCookie(c, "google_oauth_state", state, {
    secure: Bun.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    sameSite: "lax",
  });

  setCookie(c, "google_code_verifier", codeVerifier, {
    secure: Bun.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    sameSite: "lax",
  });
  return c.redirect(url.toString());
});

google.get("/callback", async (c) => {
  const storedState = getCookie(c, "google_oauth_state") ?? null;
  const codeVerifier = getCookie(c, "google_code_verifier") ?? null;

  const state = c.req.query("state") ?? null;
  const code = c.req.query("code") ?? null;

  if (
    storedState === null ||
    codeVerifier === null ||
    code === null ||
    state === null
  ) {
    return c.json({ error: "Please restart the process." }, 400);
  }
  if (storedState !== state) {
    return c.json({ error: "Please restart the process." }, 400);
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google_obj.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    return c.json({ error: "Please restart the process." }, 400);
  }

  const claims = decodeIdToken(tokens.idToken());
  const claimsParser = new ObjectParser(claims);

  const googleId = claimsParser.getString("sub");
  const name = claimsParser.getString("name");
  const picture = claimsParser.getString("picture");
  const email = claimsParser.getString("email");

  const existingUser = await getUserDBFunc(googleId, "google");
  if (existingUser !== null) {
    const token = await createJWT(
      existingUser.id,
      existingUser.email,
      existingUser.name,
    );
    const randomId = nanoid(7);
    setCookie(c, `${randomId}`, token, {
      secure: Bun.env.NODE_ENV === "production", // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
      sameSite: "lax",
    });
    return c.redirect(`${Bun.env.FRONTEND_URL}/verify_login?code=${randomId}`);
  }

  const newUser = await createUserDBFunc(
    name,
    email,
    true,
    picture,
    googleId,
    "google",
  );

  const token = await createJWT(newUser.id, newUser.email, newUser.name);
  const randomId = nanoid(7);
  setCookie(c, `${randomId}`, token, {
    secure: Bun.env.NODE_ENV === "production", // set to false in localhost
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10, // 10 min
    sameSite: "lax",
  });
  return c.redirect(`${Bun.env.FRONTEND_URL}/verify_login?code=${randomId}`);
});

export { google as googleRoute };
