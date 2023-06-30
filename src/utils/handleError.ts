import { Response } from "express";

export default function handleError(
  res: Response,
  message: string = "Bad Request",
  code: number = 403
): Response {
  return res
    .status(code)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ error: message });
}
