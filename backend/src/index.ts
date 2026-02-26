import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { Env } from "@/types";
import { routes } from "./routes";
import { jwt } from "hono/jwt";

const app = new Hono<Env>();

app.use(
  "/api/*",
  jwt({
    secret: Bun.env.JWT_SECRET!,
    alg: "HS256",
  }),
);

// example of how to use jwtPayload data
// app.get("/api/profile", (c) => {
//   const payload = c.get("jwtPayload") // decoded token payload
//   return c.json({ user: payload })
// })

app.get("/", (c) => {
  return c.text("Hello from Hono!");
});

app.route("/", routes);

// set port
const port = Bun.env.BACKEND_PORT!;
console.log(`Server is running on http://localhost:${port}`);

// serve app
serve({
  fetch: app.fetch,
  port,
});
