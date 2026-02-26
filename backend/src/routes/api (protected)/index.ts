import { Hono } from "hono";
import { userRoute } from "./user";

const api = new Hono();

api.route("/user", userRoute);

export { api as apiRoute };
