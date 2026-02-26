import { getUserDBFunc } from "@/db/funtions/users";
import { Hono } from "hono";

const user = new Hono();

user.get("/get-info", async (c) => {
  try {
    const payload = c.get("jwtPayload"); // decoded token payload
    if (!payload.sub) throw new Error("Token data missing.");
    const res = await getUserDBFunc(payload.sub, "google");
    return c.json({ res });
  } catch (error) {
    return c.json({ error: "Something Went Wrong!", err: error });
  }
});

export { user as userRoute };
