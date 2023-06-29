import { Request, Response } from "express";
import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";

export async function search(req: Request, res: Response): Promise<Response> {
  const { title, language, page } = req.body;

  async function api(
    title: string = "pikachu",
    language: string = "es",
    page: string = "1"
  ) {
    const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=true&language=${language}&page=${page}`;
    const url2 = `https://api.themoviedb.org/3/find/${title}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTliMDFlZDM0NmNhZWY2ZmEzODJhZWM3ZmE3OGFiNSIsInN1YiI6IjYzMzYwOWJjMjU1ZGJhMDA4MTY5ZDZmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y5sFjoFAoVU_W17h1dKh1-npovEmh2Lw12Ah9ABYzUQ",
      },
    };

    const response = await fetch(url, options);
    // .then((res) => res.json())
    // .then((json) => (json))
    // .catch((err) => console.error("error:" + err));
    const data = await response.json();
    return data;
  }
  const apir = await api(title, language, page);

  return res.send({ content: apir });
}

export async function pushElement(
  req: Request,
  res: Response
): Promise<Response> {
  const { element } = req.body;

  const DB_PATH = path.join(process.cwd(), "./db/");
  const DB_MOVIES = await readFile(`${DB_PATH}movies.json`, "utf-8");
  const DB_TV = await readFile(`${DB_PATH}tv.json`, "utf-8");
  let data: object[] = [...JSON.parse(DB_MOVIES)]

  data.push(element)
  
  await writeFile(
    `${DB_PATH}movies.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  return res.send({ message: "ok" });
}

// {
//   adult: false,
//   backdrop_path: '/1stUIsjawROZxjiCMtqqXqgfZWC.jpg',
//   id: 672,
//   title: 'Harry Potter y la cámara secreta',
//   original_language: 'en',
//   original_title: 'Harry Potter and the Chamber of Secrets',
//   overview: 'Harry regresa a su segundo año a Hogwarts, pero descubre que cosas malas ocurren debido a que un sitio llamado la Cámara de los Secretos ha sido abierto por el heredero de Slytherin y hará que los hijos de muggles, los impuros, aparezcan petrificados misteriosamente por un animal monstruoso.',
//   poster_path: '/3nvGqfZE3yrsqehpF107byUdUSq.jpg',
//   media_type: 'movie',
//   genre_ids: [ 12, 14 ],
//   popularity: 140.368,
//   release_date: '2002-11-13',
//   video: false,
//   vote_average: 7.724,
//   vote_count: 20012,
//   quality: 'Cam',
//   source: 'https_//ñpcasd'
// }

// {
//   adult: false,
//   backdrop_path: '/uJ16DD1dj4CQLPNCWIoiOF3l8np.jpg',
//   id: 100088,
//   name: 'The Last of Us',
//   original_language: 'en',
//   original_name: 'The Last of Us',
//   overview: 'Año 2023, veinte años después del comienzo de una plaga mundial que infectó a población con un hongo mutado transformando a las personas en unas criaturas caníbales, el contrabandista Joel tiene la misión de escoltar a la adolescente Ellie por un mundo postapocalíptico en el nada va a ser fácil para los viajeros.  Joel todavía vive atormentado por el recuerdo de su única hija. Ellie es portadora de algo que podría cambiar el destino de la humanidad ¿Conseguirán sobrevivir los dos?',
//   poster_path: '/tNQWO6cNzQYCyvw36mUcAQQyf5F.jpg',
//   media_type: 'tv',
//   genre_ids: [ 18 ],
//   popularity: 245.963,
//   first_air_date: '2023-01-15',
//   vote_average: 8.702,
//   vote_count: 3667,
//   origin_country: [ 'US' ],
//   quality: 'Cam',
//   source: 'https_//ñpcasd'
// }
