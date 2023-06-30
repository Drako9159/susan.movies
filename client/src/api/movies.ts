import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getMoviesRequest(): Promise<AxiosResponse> {
  return await axios.get("/movies");
}

export async function getMovieRequest(id: string): Promise<AxiosResponse> {
  return await axios.get(`/movies/${id}`);
}
