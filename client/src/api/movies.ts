import axios from "./axios";
import { AxiosResponse } from "axios";

export async function getMoviesRequest() {
  return await axios.get("/movies");
}
