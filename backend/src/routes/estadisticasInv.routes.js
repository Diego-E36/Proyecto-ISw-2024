"use strict";
import { Router } from "express";
import { getDistribucionProductosPorProveedorController, getEstadisticasxEstacionController, getNombreYCantidadInventarioController, getProductosBajoStockYRestockSugeridoController } 
from "../controllers/estadisticasInv.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplica middleware de autenticación y autorización
//router.
    //.use(authenticateJwt)
    //.use(isAdmin);

// Define rutas para las estadísticas del inventario
router.
    get("/inv", getNombreYCantidadInventarioController)
    .get("/proveedor", getDistribucionProductosPorProveedorController)
    .get("/bajostock", getProductosBajoStockYRestockSugeridoController)
    .get("/estaciones", getEstadisticasxEstacionController) //aún no se agrega
    .get("/estacion/:estacion", getEstadisticasxEstacionController);
export default router;