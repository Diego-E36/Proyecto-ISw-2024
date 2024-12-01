"use strict";
import { getBicicletasPorTipo } from "../services/estadisticasBici.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Obtener bicicletas por tipo
export async function getBicicletasPorTipoController(req, res) {
    try {
        const [bicicletasPorTipo, error] = await getBicicletasPorTipo();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener la distribución de bicicletas por tipo", error);
        }

        if (!bicicletasPorTipo || bicicletasPorTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Distribución de bicicletas por tipo obtenida con éxito", bicicletasPorTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}