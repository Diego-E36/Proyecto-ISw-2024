"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import estadisticasRoutes from "./estadisticasInv.routes.js";
import estadisticasBiciRoutes from "./estadisticasBici.routes.js";
import invRoutes from "./inventario.routes.js";
import bicicletaRoutes from "./bicicleta.routes.js";
import notificacionesRoutes from "./notificaciones.routes.js";
import emailRoutes from "./email.routes.js";
import servicioRoutes from "./servicio.routes.js";
import proveedoresRoutes from "./proveedores.routes.js";
import historialRoutes from "./historial.routes.js";


const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/bicicleta", bicicletaRoutes)
    .use("/estadisticas", estadisticasRoutes)
    .use("/estadisticasBici", estadisticasBiciRoutes)
    .use("/inventario", invRoutes)
    .use("/notificaciones", notificacionesRoutes)
    .use("/email", emailRoutes)
    .use("/servicio", servicioRoutes)
    .use("/proveedores", proveedoresRoutes)
    .use("/historial", historialRoutes);

export default router;