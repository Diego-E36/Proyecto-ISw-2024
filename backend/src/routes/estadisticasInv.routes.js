"use strict";
import { Router } from "express";
import { getDistribucionProductosPorProveedorController,
    getInventarioBajoStockRestockDiaController,
        getInventarioBajoStockRestockMesYearController,
        getInventarioBajoStockRestockUltimosTresMesesController,
        getInventarioBajoStockRestockYearController,
        getInventarioNombreCantidadDiaController,
        getInventarioNombreCantidadMesYearController,
        getInventarioNombreCantidadUltimosTresMesesController,
        getInventarioNombreCantidadYearController,
        getInventarioProveedorDiaController,
        getInventarioProveedorMesYearController,
        getInventarioProveedorUltimosTresMesesController,
        getInventarioProveedorYearController,
        getNombreYCantidadInventarioController, 
        getProductosBajoStockYRestockSugeridoController 
        } from "../controllers/estadisticasInv.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);

router
    .get("/inv", getNombreYCantidadInventarioController)
    .get("/dianombrecantidad/:dia/:mes/:year", getInventarioNombreCantidadDiaController)
    .get("/nombrecantidad/:mes/:year", getInventarioNombreCantidadMesYearController)
    .get("/yearnombrecantidad/:year", getInventarioNombreCantidadYearController)
    .get("/nombrecantidadtresmeses", getInventarioNombreCantidadUltimosTresMesesController)
    .get("/proveedor", getDistribucionProductosPorProveedorController)
    .get("/diaproveedor/:dia/:mes/:year", getInventarioProveedorDiaController)
    .get("/proveedor/:mes/:year", getInventarioProveedorMesYearController)
    .get("/yearproveedor/:year", getInventarioProveedorYearController)
    .get("/proveedortresmeses", getInventarioProveedorUltimosTresMesesController)
    .get("/bajostock", getProductosBajoStockYRestockSugeridoController)
    .get("/diabajostock/:dia/:mes/:year", getInventarioBajoStockRestockDiaController)
    .get("/bajostock/:mes/:year", getInventarioBajoStockRestockMesYearController)
    .get("/yearbajostock/:year", getInventarioBajoStockRestockYearController)
    .get("/bajostocktresmeses", getInventarioBajoStockRestockUltimosTresMesesController)
export default router;