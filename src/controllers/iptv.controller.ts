import { Request, Response } from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import handleError from "../utils/handleError";

const DB_PATH = path.join(process.cwd(), "./db/");

export async function getIptv(req: Request, res: Response): Promise<Response> {
  const DB_MOVIES = await readFile(`${DB_PATH}iptv.json`, "utf-8");

  return res.send({ content: JSON.parse(DB_MOVIES) });
}

export async function getOneIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "ID_NOT_FOUND", 404);
  const DB_IPTV = await readFile(`${DB_PATH}iptv.json`, "utf-8");
  const iptvs = await JSON.parse(DB_IPTV);

  const iptv = iptvs.find((e: any) => {
    return e.id === id;
  });
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);
  return res.send({ content: iptv });
}

export async function deleteIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "ID_NOT_FOUND", 404);

  const DB_IPTV = await readFile(`${DB_PATH}iptv.json`, "utf-8");
  const iptvs = await JSON.parse(DB_IPTV);

  const iptv = iptvs.find((e: any) => {
    return e.id === id;
  });
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);

  const iptvsFilter = iptvs.filter((e: any) => {
    return e.id !== id;
  });

  if (!iptvsFilter) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await writeFile(
      `${DB_PATH}iptv.json`,
      JSON.stringify(iptvsFilter, null, 2),
      "utf-8"
    );
  } catch (error) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }

  return res.status(204).send({ message: "deleted" });
}

export async function updateIptv(
  req: Request,
  res: Response
): Promise<Response> {
  const { id, element } = req.body;
  if (!id || !element) return handleError(res, "NOT_PAYLOAD_DATA", 404);

  const DB_IPTV = await readFile(`${DB_PATH}iptv.json`, "utf-8");
  const iptvs = await JSON.parse(DB_IPTV);

  const iptv = iptvs.find((e: any) => {
    return e.id === id;
  });
  if (!iptv) return handleError(res, "ID_NOT_FOUND", 404);

  const iptvsFilter = iptvs.filter((e: any) => {
    return e.id !== id;
  });

  let data: object[] = [...iptvsFilter];

  data.push(element);

  try {
    await writeFile(
      `${DB_PATH}iptv.json`,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }

  return res.send({ message: "updated" });
}
