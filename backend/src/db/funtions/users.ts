import { nanoid } from "nanoid";
import { db } from "../client";
import { typeUser, userTable } from "../schema";
import { eq } from "drizzle-orm";

export const createUserDBFunc = async (
  name: string,
  email: string,
  emailVerified?: boolean | undefined,
  picture?: string | null | undefined,
  authId?: string | null | undefined,
  authType?: "google" | "email",
) => {
  const u_id = nanoid(19);
  const user: typeUser = {
    email: email,
    id: u_id,
    name: name,
    emailVerified: emailVerified,
    image: picture,
    googleId: authType === "google" ? authId : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  try {
    await db.insert(userTable).values(user);
    return {
      id: u_id,
      authId: authId,
      authType: authType,
      email: email,
      name: name,
      picture: picture,
    };
  } catch (error) {
    throw new Error("Unexpected Error !!");
  }
};

export const getUserDBFunc = async (
  authId: string,
  authType: "google" | "email",
) => {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, authId))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
};
