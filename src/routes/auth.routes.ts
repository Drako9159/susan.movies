import { cryptController, loginController } from "../controllers/auth.controllers";
import express, { Router, Request, Response } from "express";



const router: Router = express.Router();

router.post("/crypt", cryptController);

router.post("/login", loginController)

router.get("/verify")

export default router;
