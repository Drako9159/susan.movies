import bcrypt from "bcrypt";

export async function getSalt(seg: number): Promise<string> {
  return await bcrypt.genSalt(seg);
}

export async function getHash(password: string, salt: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function decryptHash(
  check: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(check, hash);
}
