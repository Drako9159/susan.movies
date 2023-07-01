import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import { getIptv, getOneIptv, deleteIptv, updateIptv } from "../controllers/iptv.controller";

router.get("/iptvs", getIptv);

router.get("/iptvs/:id", getOneIptv);

router.delete("/iptvs/:id", deleteIptv)

router.put("/iptvs", updateIptv)

export default router;
