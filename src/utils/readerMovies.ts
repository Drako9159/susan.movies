import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DB_MOVIES = path.join(process.cwd(), "./db/movies.json");

export async function readMovies() {
  const moviesList = await readFile(DB_MOVIES, "utf-8");
  return JSON.parse(moviesList);
}

export async function readOneMovie(id: string) {
  const movies = await readMovies();
  return movies.find((e: any) => {
    return e.id === parseInt(id);
  });
}

export async function deleteOneMovie(id: string) {
  const movies = await readMovies();
  const filtered = movies.filter((e: any) => {
    return e.id !== parseInt(id);
  });
  await writeFile(DB_MOVIES, JSON.stringify(filtered, null, 2), "utf-8");
}

export async function updateOneMovie(id: string, element: object) {
  const movies = await readMovies();
  const filtered = movies.filter((e: any) => {
    return e.id != parseInt(id);
  });
  let data: object[] = [...filtered];
  data.push(element);
  await writeFile(DB_MOVIES, JSON.stringify(data, null, 2), "utf-8");
}
