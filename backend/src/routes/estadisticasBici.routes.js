"use strict";
import { Router } from "express";
import {  
    getAllBicicletasPorAroController,
    getAllBicicletasTipoController,
    getAllBicicletasVentaController,
    getBicicletasPorAroDiaController,
    getBicicletasPorAroMesController,
    getBicicletasPorAroUltimosTresMesesController,
    getBicicletasPorAroYearController,
    getBicicletasPorTipoAñoController,
    getBicicletasPorTipoDiaController,
    getBicicletasPorTipoMesController,
    getBicicletasPorTipoUltimosTresMesesController,
    getBicicletasVentaDiaController,
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
    .get("/tipobicidia/:dia/:mes/:year", getBicicletasPorTipoDiaController)
    .get("/tipobici/:mes/:year", getBicicletasPorTipoMesController)
    .get("/tipotresmeses", getBicicletasPorTipoUltimosTresMesesController)
    .get("/anobici/:year", getBicicletasPorTipoAñoController)
    .get("/allventa", getAllBicicletasVentaController)
    .get("/ventabicidia/:dia/:mes/:year", getBicicletasVentaDiaController)
    .get("/ventabici/:mes/:year", getBicicletasVentasMesController)
    .get("/ventatresmeses", getBicicletasVentaUltimosTresMesesController)
    .get("/anobiciventa/:year", getBicicletasVentaYearController)
    .get("/allaros", getAllBicicletasPorAroController)
    .get("/arobicidia/:dia/:mes/:year", getBicicletasPorAroDiaController)
    .get("/arobici/:mes/:year", getBicicletasPorAroMesController)
    .get("/arotresmeses", getBicicletasPorAroUltimosTresMesesController)
    .get("/anobiciaro/:year", getBicicletasPorAroYearController);

export default router;