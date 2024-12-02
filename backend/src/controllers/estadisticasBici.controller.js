"use strict";
import { getBicicletasPorTipo } from "../services/estadisticasBici.service.js";
import { getBicicletasVenta } from "../services/estadisticasBici.service.js";
import { getBicicletasPorAro } from "../services/estadisticasBici.service.js";
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

// Obtener bicicletas a la venta
export async function getBicicletasVentasController(req, res) {
    try {
        const [bicicletasVendidas, error] = await getBicicletasVenta();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas a la venta", error);
        }

        if (!bicicletasVendidas || bicicletasVendidas.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas a la venta registradas");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVendidas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por Aro
export async function getBicicletasPorAroController(req, res) {
    try {
        const [bicicletasPorAro, error] = await getBicicletasPorAro();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}