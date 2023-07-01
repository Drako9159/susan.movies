import express, { Router, Request, Response } from "express";
import { pushElementIpTv, pushElementMovie, search } from "../controllers/search.controller";
const router: Router = express.Router();

router.post("/search", search);

router.post("/push-element-movie", pushElementMovie)

router.post("/push-element-iptv", pushElementIpTv)

export default router;
