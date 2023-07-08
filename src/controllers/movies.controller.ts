import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { readMovies, readOneMovie, deleteOneMovie, updateOneMovie } from "../utils/readerMovies";

export async function getMovies(
  req: Request,
  res: Response
): Promise<Response> {
  return res.send({ content: await readMovies() });
}

export async function getMovie(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "PAYLOAD_NOT_FOUND", 404);
  const movie = await readOneMovie(id);
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);
  return res.send({ content: movie });
}

export async function deleteMovie(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  if (!id) return handleError(res, "PAYLOAD_NOT_FOUND", 404);
  const movie = await readOneMovie(id);
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await deleteOneMovie(id);
    return res.status(204).send({ message: "deleted" });
  } catch (err) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }
}

export async function updateMovie(
  req: Request,
  res: Response
): Promise<Response> {
  const { id, element } = req.body;
  if (!id || !element) return handleError(res, "NOT_PAYLOAD_DATA", 404);
  const movie = await readOneMovie(id);
  if (!movie) return handleError(res, "ID_NOT_FOUND", 404);
  try {
    await updateOneMovie(id, element);
    return res.send({ message: "updated" });
  } catch (err) {
    return handleError(res, "DB_ERROR_WRITE", 500);
  }
}
