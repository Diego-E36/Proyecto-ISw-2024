"use strict";
import { Router } from "express";
import {  getBicicletasPorAroController, getBicicletasPorTipoController, getBicicletasVentasController } from "../controllers/estadisticasBici.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplica middleware de autenticación y autorización
router
    .use(authenticateJwt)
    .use(isAdmin);

// Define rutas para las estadísticas de bicicletas
router
    .get("/tipobici", getBicicletasPorTipoController)
    .get("/ventabici", getBicicletasVentasController)
    .get("/arobici", getBicicletasPorAroController);

export default router;