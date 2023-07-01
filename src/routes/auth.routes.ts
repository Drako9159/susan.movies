import { cryptController } from "controllers/auth.controllers";
import express, { Router, Request, Response } from "express";



const router: Router = express.Router();

router.post("/crypt", cryptController);

router.post("/login")

router.get("/verify")

export default router;
