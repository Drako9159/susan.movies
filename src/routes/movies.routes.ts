import express, { Router, Request, Response } from "express"
const router: Router = express.Router();
import { getMovie, getMovies } from "../controllers/movies.controller"


router.get("/movies", getMovies);

router.get("/movies/:id", getMovie)

export default router;
