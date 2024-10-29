"use strict";
//aquí se definirán las rutas que conectan el frontend con el backend
import { Router } from "express";
import { getEstadisticasxEstacionController,
    getGeneralEstadisticasController, } from "../controllers/estadisticas.controller.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { getEstadisticasInventario } from "../controllers/estadisticas.controller.js"; 
import { authenticateJwt } from "../middlewares/authentication.middleware.js"; 
const router = Router();

//aplica middleware de autenticación y autorización
router
    .use(authenticateJwt)
    .use(isAdmin);

//define rutas para las estadísticas
router
    .get("/estadisticas/estaciones", getEstadisticasxEstacionController)
    .get("/estadisticas/general", getGeneralEstadisticasController)
    .get("/estadisticas/inventario", getEstadisticasInventario);

export default router;