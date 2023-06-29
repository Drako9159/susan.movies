import express, { Router, Request, Response } from "express";
import { pushElement, search } from "../controllers/search.controller";
const router: Router = express.Router();

router.post("/search", search);

router.post("/push-element", pushElement)

export default router;
