import axios from "./axios";
import { AxiosResponse } from "axios";

export async function searchRequest(
  title: string,
  language: string,
  page: string
): Promise<AxiosResponse> {
  return await axios.post("/search", { title, language, page });
}

export async function pushElementRequest(element: object) {
  return await axios.post("/push-element", { element });
}
