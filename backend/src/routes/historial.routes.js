"use strict"
// Importar Router desde express
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

// Importar manejo de historial desde controladores
import {
    getHist,
    getAllHist
} from "../controllers/historial.controller.js";

const router = Router();

router
    .get("/:id", getHist)
    .get("/", getAllHist);
export default router;