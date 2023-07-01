import dotenv from "dotenv"
dotenv.config()

export const DOMAIN: string = process.env.DOMAIN || "";
export const PORT: number = parseInt(process.env.PORT || "0", 10)
export const BACKEND_URL: string = process.env.BACKEND_URL || ""

export const USER_KEY: string = process.env.USER_KEY_BACKEND || "";
export const PASSWORD_KEY: string = process.env.PASSWORD_KEY_BACKEND || "";
export const JWT_SECRET: string = process.env.JWT_SECRET || "";


