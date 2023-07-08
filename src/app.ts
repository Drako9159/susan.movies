import express, { Express, NextFunction, Request, Response } from "express";
// import { DOMAIN, LOCAL_IP, PORT, VERCEL_URL } from "../config";
import path from "node:path";
import moviesRoutes from "./routes/movies.routes";
import searchRoutes from "./routes/search.routes";
import iptvRoutes from "./routes/iptv.routes";
import authRoutes from "./routes/auth.routes";
// import postsRoutes from "./routes/posts.routes";
// import dotenv from "dotenv";
import cors from "cors";
import { DOMAIN, PORT } from "../config";

const app: Express = express();

app.set("port", PORT || 3000);
app.use(express.json());

app.use(
  cors({
    origin: [
      `http://localhost:${PORT}`,
      `http://localhost:5000`,
      `http://192.168.1.207:${PORT}`,
      DOMAIN,
      "https://b4b8-189-193-230-248.ngrok-free.app",
    ],
    exposedHeaders: ["authorization"],
    credentials: true,
  })
);

// static files
app.use(
  "/api/files",
  express.static(path.join(process.cwd(), `./locale`))
);

app.use(express.static(path.join(process.cwd(), "./client/dist")));

// routes
app.use("/api", moviesRoutes);
app.use("/api", searchRoutes);
app.use("/api", authRoutes);
app.use("/api", iptvRoutes);
// app.use("/api", postsRoutes);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  const indexFile = path.join(process.cwd() + "/client/dist/", "index.html");
  res.sendFile(indexFile);
});

export default app;
