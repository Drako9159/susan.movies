import { loginAdmin } from "../middleware/handleJWT";
import { getHash, getSalt } from "../utils/handleCrypt";
import handleError from "../utils/handleError";
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

export async function loginController(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { user, password }: any = req.body;
    if (!user || !password) return handleError(res, "NOT_PAYLOAD_DATA", 400);
    if (!(await loginAdmin(user, password)))
      return handleError(res, "USER_UNAUTHORIZED", 401);
    const token: string | boolean = await loginAdmin(user, password);
    return (
      res
        .cookie("token", token)
        // .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Credentials", `${true}`)
        .header("Content-Type", "application/json; charset=utf-8")
        .header("authorization", `${token}`)
        .send({ token: token })
    );
  } catch (error) {
    return handleError(res, "ERROR_LOGIN_USER", 500);
  }
}
