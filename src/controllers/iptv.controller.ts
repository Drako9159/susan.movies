import { Request, Response } from "express";
import handleError from "../utils/handleError";
import {
  readIPTV,
  readOneIPTV,
  deleteOneIPTV,
  updateOneIPTV,
} from "../utils/readerIPTV";

export async function getIptv(req: Request, res: Response): Promise<Response> {
  return res.send({ content: await readIPTV() });
}

export async function getOneIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "PAYLOAD_NOT_FOUND", 404);
  const iptv = await readOneIPTV(id);
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);
  return res.send({ content: iptv });
}

export async function deleteIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "PAYLOAD_NOT_FOUND", 404);
  const iptv = readOneIPTV(id);
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await deleteOneIPTV(id);
    return res.status(204).send({ message: "deleted" });
  } catch (err) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }
}

export async function updateIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id, element } = req.body;
  if (!id || !element) return handleError(res, "PAYLOAD_NOT_FOUND", 404);
  const iptv = await readOneIPTV(id);
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await updateOneIPTV(id, element);
    return res.send({ message: "updated" });
  } catch (err) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }
}
