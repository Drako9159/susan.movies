import express, { Router, Request, Response } from "express"
const router: Router = express.Router();
import { getMovies } from "../controllers/movies.controller"


router.get("/movies", getMovies);

export default router;
