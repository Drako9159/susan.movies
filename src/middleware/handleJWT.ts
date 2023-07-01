import jwt, { JwtPayload } from "jsonwebtoken";
import { decryptHash } from "../utils/handleCrypt";
import { USER_KEY, PASSWORD_KEY, JWT_SECRET } from "../../config";

export async function loginAdmin(
  user: string,
  password: string
): Promise<string | boolean> {
  const checkPass: boolean = await decryptHash(password, PASSWORD_KEY);
  const checkUser: boolean = await decryptHash(user, USER_KEY);
  if (!checkPass || !checkUser) return false;
  return getToken(user);
}

function getToken(user: string): string {
  const sign: string = jwt.sign(
    {
      user,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
  return sign;
}

export function verifyToken(token: string): JwtPayload | null | string {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
