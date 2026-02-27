import { Hono } from "hono";
import { googleRoute } from "./google";
import { deleteCookie, getCookie } from "hono/cookie";
import { emailRoute } from "./email";

const auth = new Hono();

auth.route("/email", emailRoute);
auth.route("/google", googleRoute);

auth.post("/verify", async (c) => {
  const body = await c.req.json();

  const code: string = body?.code || "";
  if (code === "") {
    return c.json({ error: "Code is Missing" }, 400);
  }

  const jwt = getCookie(c, code);
  if (!jwt) {
    return c.json({ error: "Invalid Code" }, 400);
  }

  deleteCookie(c, code);

  return c.json({ token: jwt }, 200);
});

export { auth as authRoute };
