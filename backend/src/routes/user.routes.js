"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

// Rutas restringidas a administradores
router
  .use(authenticateJwt) // Este middleware se aplica a todas las rutas
  .use(isAdmin) // A partir de aquí, solo los administradores
  .get("/", getUsers) // Todos los autenticados pueden ver la lista de usuarios
  .get("/detail/", getUser) // Todos los autenticados pueden ver los detalles de un usuario
  .patch("/detail/", updateUser) // Solo administradores pueden actualizar
  .delete("/detail/", deleteUser); // Solo administradores pueden eliminar

export default router;