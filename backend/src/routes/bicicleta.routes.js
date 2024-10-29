"use strict";
 import { Router } from "express";
 import { isAdmin } from "../middlewares/authorization.middleware.js";
 import { authenticateJwt } from "../middlewares/authentication.middleware.js";
 import {
     createBicicletaService,
     deleteBicicletaService,
     getBicicletasService,
     updateBicicletaService,

 } from "../services/bicicleta.service.js";

 const router = Router();

 router
     .use(authenticateJwt)
     .use(isAdmin);

 router
     .get("/", getBicicletasService)
     .post("/", createBicicletaService)
     .patch("/:id", updateBicicletaService)
     .delete("/:id", deleteBicicletaService);

 export default router;