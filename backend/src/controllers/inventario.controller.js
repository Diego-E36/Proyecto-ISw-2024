"use strict";
import {
    createInvService,
    deleteInvService,
    getAllInvService,
    getInvService,
    updateInvService,
} from "../services/inventario.service.js";

import {
    invBodyValidation,
    invQueryValidation,
} from "../validations/inventario.validation.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getInv(req, res) {
    try {
        const { id, numeroSerie } = req.query;

        const { error } = invQueryValidation.validate({ id, numeroSerie });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [inventario, errorInv] = await getInvService({ id, numeroSerie });

        if (errorInv) return handleErrorClient(res, 404, errorInv);

        handleSuccess(res, 200, "Inventario encontrado", inventario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllInv(req, res) {
    try {
        const [inventario, errorInv] = await getAllInvService();

        if (errorInv) return handleErrorClient(res, 404, errorInv);

        inventario.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Inventario encontrado", inventario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateInv(req, res) {
    try {
        const { id, numeroSerie } = req.query;
        const { body } = req;

        const { error: queryError } = invQueryValidation.validate({id ,numeroSerie });

        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const [inventario, errorInv] = await updateInvService({ id, numeroSerie }, body);

        if (errorInv) return handleErrorClient(res, 404, "Error modificando al usuario", errorInv);

        handleSuccess(res, 200, "inventario modificado correctamente", inventario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteInv(req, res) {
    try {
        const { id, numeroSerie } = req.query;

        const { error: queryError } = invQueryValidation.validate({ id, numeroSerie });

        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const [inventarioDelete, errorInv] = await deleteInvService({ id, numeroSerie });

        if (errorInv) return handleErrorClient(res, 404, "Error elminando unidad", errorInv);

        handleSuccess(res, 200, "Unidad eliminada correctamente", inventarioDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createInv(req, res) {
    try {
        const inventario = req.body;

        const { error } = invBodyValidation.validate(inventario);

        if(error) return handleErrorClient(res, 400, "Error de validación en los datos enviados", error);

        const invSaved = await createInvService(inventario);

        handleSuccess(res, 201, "Unidad creada correctamente", invSaved);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}