import { Hono } from "hono";

const user = new Hono();

user.get("/get-info", (c) => {
  try {
    const payload = c.get("jwtPayload"); // decoded token payload

    return c.json({ user: payload });
  } catch (error) {
    return c.json({ error: "Something Went Wrong!", err: error });
  }
});

export { user as userRoute };
