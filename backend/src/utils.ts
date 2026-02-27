import { sign } from "hono/jwt";
import { genSalt, hash } from "bcryptjs";
export const createJWT = async (
  user_id: string,
  email: string,
  name: string,
) => {
  const payload = {
    sub: user_id, // subject (user identifier)
    email: email,
    name: name,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // token expiry (e.g., 7 days)
  };

  const secret = Bun.env.JWT_SECRET!; // or process.env.JWT_SECRET
  const token = await sign(payload, secret, "HS256");

  return token;
};

export async function hashPassword(password: string) {
  const saltRounds = 10;

  const salt = await genSalt(saltRounds);

  const hashed_password = await hash(password, salt);

  return hashed_password;
}
