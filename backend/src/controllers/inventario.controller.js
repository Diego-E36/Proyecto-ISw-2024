"use strict";
import {
    createInvService,
    deleteInvService,
    getAllInvService,
    getInvBelowThresholdService,
    getInvService,
    updateInvService,
} from "../services/inventario.service.js";

import {
    createNotificactionService
} from "../services/notificaciones.service.js"

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
        const { id } = req.params; 
        const { numeroSerie } = req.query;

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
        const { id } = req.params;
        const { numeroSerie } = req.query;
        const { body } = req;

        const { error: queryError } = invQueryValidation.validate({ id ,numeroSerie });

        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const { error: bodyError } = invBodyValidation.validate(body);

        if (bodyError) {
            return handleErrorClient(res, 400, "Error de validación en los datos enviados", bodyError);
        }

        const [inventario, errorInv] = await updateInvService({ id, numeroSerie }, body);

        if (errorInv) return handleErrorClient(res, 500, "Error modificando el inventario", errorInv);

        
        await createNotificactionService(inventario, "update");

        handleSuccess(res, 200, "inventario modificado correctamente", inventario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteInv(req, res) {
    try {
        const { id } = req.query;

        const { error: queryError } = invQueryValidation.validate({ id });

        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const [inventarioDelete, errorInv] = await deleteInvService({ id });

        if (errorInv) return handleErrorClient(res, 404, "Error elminando unidad", errorInv);

        await createNotificactionService(inventarioDelete, "delete");

        handleSuccess(res, 200, "Unidad eliminada correctamente", inventarioDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createInv(req, res) {
    try {
        const inventario = req.body;

        // validacion de esquema de los datos
        const { error } = invBodyValidation.validate(inventario);
        if (error) return handleErrorClient(res, 400, "Error de validación en los datos enviados", error.message);

        // verificacion de numeros de serie duplicados
        const [existingInv, errorExistingInv] = await getInvService({ numeroSerie: inventario.numeroSerie });

        if (errorExistingInv && errorExistingInv !== "Item del inventario no encontrado") {
            return handleErrorClient(res, 500, "Error verificando duplicados", errorExistingInv);
        }

        if(existingInv) {
            return handleErrorClient(res, 400, "Ya existe un item con ese número de serie");
        }

        const [newInv, errorInv] = await createInvService(inventario);

        await createNotificactionService(newInv, "create");

        handleSuccess(res, 201, "Item del inventario creado", newInv);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getInvBelowThreshold(req, res) {
    try {
        const [Inv, errorMat] = await getInvBelowThresholdService();
    
        // Verifica si hay materiales bajo el umbral
        if (errorMat) return handleErrorClient(res, 404, errorMat);
    
        // Si no hay materiales bajo umbral, responde con 204
        if (!Inv || Inv.length === 0) {
            return handleSuccess(res, 204);
        }
    
        // Si hay materiales bajo el umbral, responde con 200 y los datos
        handleSuccess(res, 200, "Inventario bajo umbral", Inv);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}