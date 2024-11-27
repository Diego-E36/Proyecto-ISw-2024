"use strict";
// Importar Router desde express
import { Router } from "express";

// Importar manejo de inventario desde controladores
import {
    createInv,
    deleteInv,
    getAllInv,
    getInv,
    getInvBelowThreshold,
    updateInv,
} from "../controllers/inventario.controller.js";

const router = Router();

router
    .post("/", createInv)
    .get("/all", getAllInv)
    .get("/:id", getInv)
    .get("/", getInvBelowThreshold)
    .patch("/:id", updateInv)
    .delete("/:id", deleteInv);

export default router;