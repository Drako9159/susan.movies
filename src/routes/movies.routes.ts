import express, { Router, Request, Response } from "express"
const router: Router = express.Router();
import { deleteMovie, getMovie, getMovies, updateMovie } from "../controllers/movies.controller"


router.get("/movies", getMovies);

router.get("/movies/:id", getMovie)

router.delete("/movies/:id", deleteMovie)

router.put("/movies", updateMovie)

export default router;
