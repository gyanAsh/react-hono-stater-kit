import { getUserInfoByIdDBFunc } from "@/db/funtions/users";
import { Hono } from "hono";

const user = new Hono();

user.get("/get-info", async (c) => {
  try {
    const payload = c.get("jwtPayload"); // decoded token payload
    if (!payload.sub) throw new Error("Token data missing.");
    const res = await getUserInfoByIdDBFunc(payload.sub);
    return c.json({ res });
  } catch (error) {
    return c.json({ error: "Something Went Wrong!", err: error });
  }
});

export { user as userRoute };
