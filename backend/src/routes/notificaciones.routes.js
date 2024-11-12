"use strict";
// Importar Router desde express
import { Router } from "express";
// Importar manejo de inventario desde controladores
import {
    deleteNotification,
    getAllNotifications
} from "../controllers/notificaciones.controller.js";

const router = Router();


router
    
    .get("/all", getAllNotifications)
    .delete("/:id", deleteNotification);


export default router;