import { getHash, getSalt } from "utils/handleCrypt";
import handleError from "utils/handleError";
import { Request, Response } from "express";

export async function cryptController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { value }: any = req.body;
    if (!value) return handleError(res, "VALUE_IS_REQUIRED", 400);

    const salt: string = await getSalt(12);
    const hash: string = await getHash(value, salt);
    return res.send({ hash: hash });
  } catch (error) {
    return handleError(res, "ERROR_GENERATING_HASH", 500);
  }
}
