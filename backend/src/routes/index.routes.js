"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import estadisticasRoutes from "./estadisticas.routes.js";
import invRoutes from "./inventario.routes.js";
import bicicletaRoutes from "./bicicleta.routes.js";
import materialesRoutes from "./materiales.routes.js"

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/bicicleta", bicicletaRoutes)
    .use("/estadisticas", estadisticasRoutes)
    .use("/inventario", invRoutes)
    .use("/materiales", materialesRoutes);

export default router;