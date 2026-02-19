import { Hono } from "hono";
import { apiRoute } from "./api (protected)";

const routes = new Hono();

routes.route("/api", apiRoute);

export { routes };
