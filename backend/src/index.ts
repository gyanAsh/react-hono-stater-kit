import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { Env } from "@/types";

const app = new Hono<Env>();

// app.use("*", async (c, next) => {
//   const session = await auth.api.getSession({ headers: c.req.raw.headers });
//   if (!session) {
//     c.set("user", null);
//     c.set("session", null);
//     await next();
//     return;
//   }
//   c.set("user", session.user);
//   c.set("session", session.session);
//   await next();
// });
app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: Bun.env.FRONTEND_URL!, // replace with your origin (frontend)
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(
  "*",
  csrf({
    origin: Bun.env.FRONTEND_URL!,
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono! - Ash");
});

// set port
const port = 8080;
console.log(`Server is running on http://localhost:${port}`);

// serve app
serve({
  fetch: app.fetch,
  port,
});
