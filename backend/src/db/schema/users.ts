import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey().unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  googleId: text("google_id").unique(),
  restricted: boolean("user_restricted").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type typeUser = typeof userTable.$inferInsert;
