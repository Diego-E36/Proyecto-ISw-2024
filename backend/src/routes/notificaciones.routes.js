"use strict";
// Importar Router desde express
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
// Importar manejo de inventario desde controladores
import {
    deleteNotification,
    getAllNotifications
} from "../controllers/notificaciones.controller.js";

const router = Router();


router
    .use(authenticateJwt) // Este middleware se aplica a todas las rutas
    .use(isAdmin) // A partir de aquí, solo los administradores
    .get("/all", getAllNotifications)
    .delete("/:id", deleteNotification);


export default router;