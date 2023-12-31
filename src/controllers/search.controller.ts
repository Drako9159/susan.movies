import { Request, Response } from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { TMOVIES_TOKEN } from "../../config";
const uuid: string = uuidv4();

export async function search(req: Request, res: Response): Promise<Response> {
  const { title, language, page } = req.body;
  const data = await api(title, language, page);
  return res.send({ content: data });
}

async function api(
  title: string = "pikachu",
  language: string = "es",
  page: string = "1"
) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=${language}&page=${page}`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMOVIES_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function pushElementMovie(
  req: Request,
  res: Response
): Promise<Response> {
  const { element } = req.body;

  const DB_PATH = path.join(process.cwd(), "./db/");
  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");
  let data: object[] = [...JSON.parse(DB_MOVIES)];

  data.push(element);

  await writeFile(
    `${DB_PATH}movies.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return res.send({ message: "ok" });
}

export async function pushElementIpTv(
  req: Request,
  res: Response
): Promise<Response> {
  const { element } = req.body;

  const DB_PATH = path.join(process.cwd(), "./db/");
  const DB_IPTV = await readFile(`${DB_PATH}iptv.json`, "utf-8");
  let data: object[] = [...JSON.parse(DB_IPTV)];

  data.push({ id: uuid, ...element });

  await writeFile(
    `${DB_PATH}iptv.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return res.send({ message: "ok" });
}
