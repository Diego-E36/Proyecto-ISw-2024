"use strict";
import{
    createBicicletaService,
    deleteBicicletaService,
    getAllBicicletaService,
    getBicicletaService,
    updateBicicletaService,
} from "../services/bicicleta.service.js";

import {
    createNotificactionService
} from "../services/notificaciones.service.js"

import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

import {
    bicicletaBodySchema,
    bicicletaQuerySchema,
} from "../validations/bicicleta.validation.js";

export async function getBici(req, res){
    try {
        const { id } = req.params;
        const { numeroSerie } = req.query;

        const { error } = bicicletaQuerySchema.validate({ id, numeroSerie });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [bicis, errorBicis] = await getBicicletaService({ id, numeroSerie });

        if (errorBicis) return handleErrorClient(res, 404, errorBicis);

        handleSuccess(res, 200, "Bicicleta encontrada", bicis);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllBici(req, res) {
    try {
        const [bicileta, errorBicicleta] = await getAllBicicletaService();

        if (errorBicicleta) return handleErrorClient(res, 404, errorBicicleta);

        bicileta.length === 0
            ? handleSuccess(res, 204, "No hay bicicletas registradas", {})
            : handleSuccess(res, 200, "Bicicletas encontradas", bicileta);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createBici(req, res) {
    try {
        const bicicleta = req.body;
        // Validación del esquema de datos
        const { error } = bicicletaBodySchema.validate(bicicleta);
        if (error) {
            return handleErrorClient(res, 400, "Error de validación en los datos", error.message);
        }
        // Verificación de duplicados en numeroSerie
        const [existingBici, errorExistingBici] = await getBicicletaService({
            numeroSerie: bicicleta.numeroSerie // Solo buscamos por numeroSerie
        });

        if (errorExistingBici && errorExistingBici !== "Bicicleta no encontrada") {
            return handleErrorServer(res, 500, "Error interno al verificar duplicados");
        }

        if (existingBici) {
            // Si se encontró una bicicleta con el mismo numeroSerie, rechazamos la creación
            return handleErrorClient(res, 400, "Ya existe una bicicleta con el mismo número de serie.");
        }

        // Crear nueva bicicleta si no hay duplicado
        const [ newBici, errorBicicleta ] = await createBicicletaService(bicicleta);

        if(errorBicicleta === "No se puede crear una bicicleta a la venta") return handleErrorClient(res, 418, "no se pudo crear una bicicleta", errorBicicleta);

        if(errorBicicleta) return handleErrorClient(res, 400, errorBicicleta);

        await createNotificactionService(newBici, "createBicicleta")

        handleSuccess(res, 201, "Bicicleta creada", newBici);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateBici(req, res){
    try {
        const { id } = req.params;
        const { body } = req;
        const { error: queryError } = bicicletaQuerySchema.validate({ id });

        if (queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const { error: bodyError } = bicicletaBodySchema.validate(body);

        if (bodyError) return handleErrorClient(res, 400, "Error de validación en los datos enviados", bodyError.message);
        
        const [bicicleta, errorBicicleta] = await updateBicicletaService({ id }, body);

        if(errorBicicleta === "Bicicleta asociada a un Servicio") return handleErrorClient(res, 418, "Bicicleta en uso",errorBicicleta);

        if (errorBicicleta) return handleErrorClient(res, 404, errorBicicleta);

        await createNotificactionService(bicicleta, "updateBicicleta")

        handleSuccess(res, 200, "Bicicleta actualizada", bicicleta);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteBici(req, res){
    try {
        const { id } = req.params;

        const { error: queryError } = bicicletaQuerySchema.validate({ id });

        if (queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const [bicicleta, errorBicicleta] = await deleteBicicletaService({ id });

        if(errorBicicleta === "Bicicleta asociada a un Servicio") return handleErrorClient(res, 418, "Bicicleta en uso",errorBicicleta);

        if (errorBicicleta) return handleErrorClient(res, 404, errorBicicleta);

        handleSuccess(res, 200, "Bicicleta eliminada", bicicleta);
    } catch (error) {
        handleErrorClient(res, 500, error.message);
    }
}
