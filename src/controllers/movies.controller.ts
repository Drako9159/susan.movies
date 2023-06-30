import { Request, Response } from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import handleError from "../utils/handleError";

const DB_PATH = path.join(process.cwd(), "./db/");

export async function getMovies(
  req: Request,
  res: Response
): Promise<Response> {
  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");

  return res.send({ content: JSON.parse(DB_MOVIES) });
}

export async function getMovie(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "ID_NOT_FOUND", 404);
  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");
  const movies = await JSON.parse(DB_MOVIES);

  const movie = movies.find((e: any) => {
    return e.id === parseInt(id);
  });
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);
  return res.send({ content: movie });
}
