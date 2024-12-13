"use strict";
import { getBicicletasVentaMes } from "../services/estadisticasBici.service.js";
import { getBicicletasPorTipoMes } from "../services/estadisticasBici.service.js";
import { getBicicletasPorAroMes } from "../services/estadisticasBici.service.js";
import { getAllBicicletasTipo } from "../services/estadisticasBici.service.js";
import { getAllBicicletasVenta } from "../services/estadisticasBici.service.js";
import { getAllBicicletasPorAro } from "../services/estadisticasBici.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

// Obtener todas las bicicletas por tipo
export async function getAllBicicletasTipoController(req, res) {
    try {
        const [allBicicletasTipo, error] = await getAllBicicletasTipo();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas por tipo", error);
        }

        if (!allBicicletasTipo || allBicicletasTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", allBicicletasTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener bicicletas por tipo filtrado por meses
export async function getBicicletasPorTipoMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }
    
    try {
        const [bicicletasPorTipo, error] = await getBicicletasPorTipoMes(mesNumero);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por tipo y mes", error);
        }

        if (!bicicletasPorTipo || bicicletasPorTipo.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes");
        }

        handleSuccess(res, 200, "Bicicletas por tipo obtenidas con éxito", bicicletasPorTipo);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener todas las bicicletas a la venta
export async function getAllBicicletasVentaController(req, res) {
    try {
        const [bicicletasVenta, error] = await getAllBicicletasVenta();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas a la venta", error);
        }

        if (!bicicletasVenta || bicicletasVenta.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas a la venta registradas");
        }

        handleSuccess(res, 200, "Bicicletas a la venta obtenidas con éxito", bicicletasVenta);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

// Obtener bicicletas a la venta filtrado por meses
export async function getBicicletasVentasMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }

    try {
        const [bicicletasVendidas, error] = await getBicicletasVentaMes(mesNumero);

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

// Obtener todas las bicicletas por aro
export async function getAllBicicletasPorAroController(req, res) {
    try {
        const [bicicletasPorAro, error] = await getAllBicicletasPorAro();

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener todas las bicicletas por aro", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}

//Obtener bicicletas por Aro filtrado por meses
export async function getBicicletasPorAroMesController(req, res) {
    const { mes } = req.params;
    // Valida que el mes que sea un número válido entre 1 y 12
    const mesNumero = parseInt(mes, 10);
    if (isNaN(mesNumero) || mesNumero < 1 || mesNumero > 12) {
        return res.status(400).json({ error: "El parámetro 'mes' debe ser un número entre 1 y 12" });
    }

    try {
        const [bicicletasPorAro, error] = await getBicicletasPorAroMes(mesNumero);

        if (error) {
            return handleErrorClient(res, 404, "Error al obtener bicicletas por aro y mes", error);
        }

        if (!bicicletasPorAro || bicicletasPorAro.length === 0) {
            return handleSuccess(res, 204, "No hay bicicletas registradas para este mes");
        }

        handleSuccess(res, 200, "Bicicletas por aro obtenidas con éxito", bicicletasPorAro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error);
    }
}
