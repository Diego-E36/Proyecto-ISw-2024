"use strict";
import { Router } from "express";
import { getDistribucionProductosPorProveedorController,
        getInventarioBajoStockRestockMesYearController,
        getInventarioBajoStockRestockUltimosTresMesesController,
        getInventarioBajoStockRestockYearController,
        getInventarioNombreCantidadMesYearController,
        getInventarioNombreCantidadUltimosTresMesesController,
        getInventarioNombreCantidadYearController,
        getInventarioProveedorMesYearController,
        getInventarioProveedorUltimosTresMesesController,
        getInventarioProveedorYearController,
        getNombreYCantidadInventarioController, 
        getProductosBajoStockYRestockSugeridoController 
        } from "../controllers/estadisticasInv.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplica middleware de autenticación y autorización
router
    .use(authenticateJwt)
    .use(isAdmin);

// Define rutas para las estadísticas del inventario
router
    .get("/inv", getNombreYCantidadInventarioController)
    .get("/nombrecantidad/:mes/:year", getInventarioNombreCantidadMesYearController)
    .get("/yearnombrecantidad/:year", getInventarioNombreCantidadYearController)
    .get("/nombrecantidadtresmeses", getInventarioNombreCantidadUltimosTresMesesController)
    .get("/proveedor", getDistribucionProductosPorProveedorController)
    .get("/proveedor/:mes/:year", getInventarioProveedorMesYearController)
    .get("/yearproveedor/:year", getInventarioProveedorYearController)
    .get("/proveedortresmeses", getInventarioProveedorUltimosTresMesesController)
    .get("/bajostock", getProductosBajoStockYRestockSugeridoController)
    .get("/bajostock/:mes/:year", getInventarioBajoStockRestockMesYearController)
    .get("/yearbajostock/:year", getInventarioBajoStockRestockYearController)
    .get("/bajostocktresmeses", getInventarioBajoStockRestockUltimosTresMesesController)
export default router;