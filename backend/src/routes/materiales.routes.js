"use strict";
// Importar Router desde express
import { Router } from "express";

import {
    createMaterial,
    deleteMaterial,
    getAllMaterials,
    getMaterialById,
    getMaterialsBelowThreshold,
    updateMaterial,   
} from "../controllers/materiales.controller.js"

const router = Router();

router
    .post("/", createMaterial)
    .get("/all", getAllMaterials)
    .get("/:id", getMaterialById)
    .get("/", getMaterialsBelowThreshold)
    .patch("/:id", updateMaterial)
    .delete("/:id", deleteMaterial)
    

export default router;