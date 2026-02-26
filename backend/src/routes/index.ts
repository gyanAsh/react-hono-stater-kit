import { Hono } from "hono";
import { apiRoute } from "./api (protected)";
import { authRoute } from "./auth";

const routes = new Hono();

routes.route("/api", apiRoute);
routes.route("/auth", authRoute);

export { routes };
