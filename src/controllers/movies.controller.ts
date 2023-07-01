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

export async function deleteMovie(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "ID_NOT_FOUND", 404);

  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");
  const movies = await JSON.parse(DB_MOVIES);

  const movie = movies.find((e: any) => {
    return e.id === parseInt(id);
  });
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);

  const moviesFilter = movies.filter((e: any) => {
    return e.id !== parseInt(id);
  });

  if (!moviesFilter) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await writeFile(
      `${DB_PATH}movies.json`,
      JSON.stringify(moviesFilter, null, 2),
      "utf-8"
    );
  } catch (error) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }

  return res.status(204).send({ message: "deleted" });
}

export async function updateMovie(
  req: Request,
  res: Response
): Promise<Response> {
  const { id, element } = req.body;
  if (!id || !element) return handleError(res, "NOT_PAYLOAD_DATA", 404);

  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");
  const movies = await JSON.parse(DB_MOVIES);

  const movie = movies.find((e: any) => {
    return e.id === parseInt(id);
  });
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);

  const moviesFilter = movies.filter((e: any) => {
    return e.id !== parseInt(id);
  });

  let data: object[] = [...moviesFilter];

  data.push(element);

  try {
    await writeFile(
      `${DB_PATH}movies.json`,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }

  return res.send({ message: "updated" });
}
