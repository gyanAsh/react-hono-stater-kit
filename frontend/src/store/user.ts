// store/users.ts
import { persistentAtom } from "@nanostores/persistent";

// --------- Auth Token ------------
type Token = string;
export const $token = persistentAtom<Token>("token", "", {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export async function setAuthToken(t: Token) {
  $token.set(t);
}

export function removeAuthToken() {
  $token.set("");
}

// ----------- User Info ---------
