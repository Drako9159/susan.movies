import axios, { AxiosInstance } from "axios";

const authApi: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.207:3000/api",
  withCredentials: true,
});
export default authApi;
