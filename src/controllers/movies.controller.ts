import { Request, Response } from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const DB_PATH = path.join(process.cwd(), "./db/");

export async function getMovies(
  req: Request,
  res: Response
): Promise<Response> {
  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");

  return res.send({ content: JSON.parse(DB_MOVIES) });
}
