"use strict";
import { Router } from "express";
import {  
    getAllBicicletasPorAroController,
    getAllBicicletasTipoController,
    getAllBicicletasVentaController,
    getBicicletasPorAroMesController,
    getBicicletasPorAroUltimosTresMesesController,
    getBicicletasPorAroYearController,
    getBicicletasPorTipoAñoController,
    getBicicletasPorTipoMesController,
    getBicicletasPorTipoUltimosTresMesesController,
    getBicicletasVentasMesController,
    getBicicletasVentaUltimosTresMesesController,
    getBicicletasVentaYearController
} from "../controllers/estadisticasBici.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplica middleware de autenticación y autorización
router
    .use(authenticateJwt)
    .use(isAdmin);

// Define rutas para las estadísticas de bicicletas
router
    .get("/alltipo", getAllBicicletasTipoController)
    .get("/tipobici/:mes", getBicicletasPorTipoMesController)
    .get("/tipotresmeses", getBicicletasPorTipoUltimosTresMesesController)
    .get("/anobici/:year", getBicicletasPorTipoAñoController)
    .get("/allventa", getAllBicicletasVentaController)
    .get("/ventabici/:mes", getBicicletasVentasMesController)
    .get("/ventatresmeses", getBicicletasVentaUltimosTresMesesController)
    .get("/anobiciventa/:year", getBicicletasVentaYearController)
    .get("/allaros", getAllBicicletasPorAroController)
    .get("/arobici/:mes", getBicicletasPorAroMesController)
    .get("/arotresmeses", getBicicletasPorAroUltimosTresMesesController)
    .get("/anobiciaro/:year", getBicicletasPorAroYearController);

export default router;