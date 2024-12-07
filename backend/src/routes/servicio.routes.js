"use strict";
// Importar Router desde express
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
// Importar manejo de inventario desde controladores
import {
    createServicio,
    deleteServicio,
    getAllServicios,
    getServicio,
    updateServicio 
} from "../controllers/servicio.controller.js";

const router = Router();


router
    .use(authenticateJwt) // Este middleware se aplica a todas las rutas
    .post("/", createServicio)
    .delete("/:id", deleteServicio)
    .get("/", getAllServicios)
    .get("/:id_bicicleta",  getServicio)
    .patch("/:id", updateServicio);

export default router;