"use strict"
import {
    getHistorialService,
    getAllHistorialService
} from "../services/historial.service.js"

import {
    histQueryValidation
} from "../validations/historial.validation.js"

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getHist(req, res) {
    try {
        const { id } = req.params;

        const { error } = histQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [historial, errorHist] = await getHistorialService({ id });

        if (errorHist) return handleErrorClient(res, 404, errorHist);

        handleSuccess(res, 200, "Historial encontrado", historial);
    } catch (error) {
        handleErrorClient(res, 500, error.message);
    }
}

export async function getAllHist(req, res) {
    try {
        const [historial, errorHist] = await getAllHistorialService();

        if (errorHist) return handleErrorClient(res, 404, errorHist);

        historial.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Historial encontrado", historial);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}