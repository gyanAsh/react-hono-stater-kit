import { createUserDBFunc, getExistingUserDBFunc } from "@/db/funtions/users";
import { createJWT, hashPassword } from "@/utils";
import { compare } from "bcryptjs";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { nanoid } from "nanoid";

const email = new Hono();

email.post("/register", async (c) => {
  try {
    const { user_name, user_email, password } = (await c.req.json()) as {
      user_name: string;
      user_email: string;
      password: string;
    };

    const password_regex = /^\S{8,}$/;
    if (!password_regex.test(password)) {
      throw new Error("Min. length should be 8 without any whitespace.");
    }
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email_regex.test(user_email)) {
      throw new Error("Invalid Email ID.");
    }

    const existingUser = await getExistingUserDBFunc(user_email, "email");
    if (!!existingUser?.id) {
      throw new Error("Email ID already exists.");
    }
    const hash_password = await hashPassword(password);

    const newUser = await createUserDBFunc(
      user_name,
      user_email,
      undefined,
      null,
      null,
      "email",
      hash_password,
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
  } catch (error) {
    return c.json({ error: "Something went wrong", err: error }, 400);
  }
});

email.post("/login", async (c) => {
  try {
    const { user_email, password } = (await c.req.json()) as {
      user_email: string;
      password: string;
    };

    const password_regex = /^\S{8,}$/;
    if (!password || !password_regex.test(password)) {
      throw new Error("Min. length should be 8 without any whitespace.");
    }
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!user_email || !email_regex.test(user_email)) {
      throw new Error("Invalid Email ID.");
    }

    const existingUser = await getExistingUserDBFunc(user_email, "email");
    if (
      existingUser == null ||
      existingUser == undefined ||
      !existingUser?.password
    ) {
      throw new Error("Invalid Credentials.");
    }

    const password_is_correct = await compare(password, existingUser.password);
    if (!password_is_correct) {
      throw new Error("Invalid Credentials.");
    }

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
  } catch (error) {
    return c.json({ error: "Something went wrong", err: error }, 400);
  }
});

export { email as emailRoute };
