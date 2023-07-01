import { NextFunction, Request, Response } from "express";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./handleJWT";
import handleError from "../utils/handleError";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const { authorization }: any = req.headers;
    if (!authorization) return handleError(res, "NOT_TOKEN_PROVIDER", 400);
    const token: string = authorization?.split(" ")[1] || "";
    const dataToken: JwtPayload | null | string = verifyToken(token);
    if (!dataToken) {
      return handleError(res, "TOKEN_EXPIRED", 401);
    }
    next();
  } catch (error) {
    return handleError(res, "NOT_SESSION", 401);
  }
}
