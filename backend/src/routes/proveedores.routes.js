"use strict";
// Importar Router desde express
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
// Importar manejo de proveedores desde controladores
import {
    createProv,
    deleteProv,
    getAllProv,
    getProv,
    updateProv,
} from "../controllers/proveedores.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .post("/", createProv)
    .get("/all", getAllProv)
    .get("/:id", getProv)
    .patch("/:id", updateProv)
    .delete("/:id", deleteProv);

export default router;