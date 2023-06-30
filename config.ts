import dotenv from "dotenv"
dotenv.config()

export const DOMAIN: string = process.env.DOMAIN || "";
export const PORT: number = parseInt(process.env.PORT || "0", 10)
export const BACKEND_URL: string = process.env.BACKEND_URL || ""