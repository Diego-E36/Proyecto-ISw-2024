"use strict";
//Aquí van las cosas para manejar las peticiones HTTP
import { getEstadisticasxEstacionesService,
    getGeneralEstadisticasService, saveOperatorInteractionService } from "../services/estadisticas.service.js";

import { obtenerEstadisticasInventario } from "../services/estadisticas.service.js";
import { handleErrorClient,
        handleErrorServer,
        handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getEstadisticasxEstacionController(req, res){
    try{
        const [estadisticas,error] = await getEstadisticasxEstacionesService();
    
        if (error){
            return handleErrorClient(res, 404, "Error al obtener las estadísticas por estaciones", error);
        }

        if (!estadisticas || Object.keys(estadisticas).length === 0){
            return handleSuccess(res, 204, "No hay estadísticas registradas");
        }

        handleSuccess(res, 200, "Estadísticas por estaciones obtenidas", estadisticas);
    }catch(error){
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

export async function getGeneralEstadisticasController(req,res){
    try {
        const [estadisticas,error] = await getGeneralEstadisticasService();
    
    if (error){
        return handleErrorClient(res, 404, "Error al obtener las estadísticas generales", error);
    }

    if (!estadisticas || estadisticas.length === 0){
        return handleSuccess(res, 204, "No hay estadísticas registradas");
    }

    handleSuccess(res, 200, "Estadísticas generales obtenidas", estadisticas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtiene las estadísticas de inventario
export async function getEstadisticasInventario(req, res) {
    try {
    const estadisticasInv = await obtenerEstadisticasInventario();

    if (!estadisticasInv) {
        return handleErrorServer(res, 500, "Error obteniendo estadísticas de inventario.");
    }

    handleSuccess(res, 200, "Estadísticas de inventario obtenidas con éxito", estadisticasInv);
    } catch (error) {
    handleErrorServer(res, 500, error.message);
    }
}
