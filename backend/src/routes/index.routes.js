"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import estadisticasRoutes from "./estadisticasInv.routes.js";
import invRoutes from "./inventario.routes.js";
import bicicletaRoutes from "./bicicleta.routes.js";
import materialesRoutes from "./materiales.routes.js";
import notificacionesRoutes from "./notificaciones.routes.js";
import emailRoutes from "./email.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/bicicleta", bicicletaRoutes)
    .use("/estadisticas", estadisticasRoutes)
    .use("/inventario", invRoutes)
    .use("/materiales", materialesRoutes)
    .use("/notificaciones", notificacionesRoutes)
    .use("/email", emailRoutes);

export default router;