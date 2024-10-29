"use strict";
import{
    createBicicletaService,
    deleteBicicletaService,
    getBicicletasService,
    updateBicicletaService,
} from "../services/bicicleta.service.js";

import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";
import Joi from "joi";

export async function getBici(req, res){
    try {
        const { id, numeroSerie } = req.query;
        // Implementar validación de query joi
        const querySchema = Joi.object({
            id: Joi.number().integer(),
            numeroSerie: Joi.string().case("upper"),
        });

        const { error } = querySchema.validate({ id, numeroSerie });
        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const bicis = await getBicicletasService();
        handleSuccess(res, 200, "Bicicletas encontradas", bicis);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createBici(req, res){
    try {
        const { body } = req;
        const biciSchema = Joi.object({
            id: Joi.number().integer().required(),
            numeroSeriel: Joi.string().case("upper").required(),
            marca: Joi.string().required(),
            modelo: Joi.string().required(),
            color: Joi.string().required(),
            tipo: Joi.string().required(),
        });
        const { error } = biciSchema.validate(body);

        if (error) return handleErrorClient(res, 400, "Error de validación en los datos", error.message);

        const newBici = await createBicicletaService(body);
        handleSuccess(res, 201, "Bicicleta creada", newBici);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateBici(req, res){
    try {
        const { id, numeroSerie } = req.query;
        const { body } = req;

        const querySchema = Joi.object({
            id: Joi.number().integer(),
            numeroSerie: Joi.string().case("upper"),
        });

        const { error: queryError } = querySchema.validate({ id, numeroSerie });

        if (queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const biciSchema = Joi.object({
            id: Joi.number().integer().required(),
            numeroSerie: Joi.string().case("upper").required(),
            marca: Joi.string().required(),
            modelo: Joi.string().required(),
            color: Joi.string().required(),
            tipo: Joi.string().required(),
        });

        const { error: biciError } = biciSchema.validate(body);

        if (biciError) return handleErrorClient(res, 400, "Error de validación en los datos", biciError.message);

        const updatedBici = await updateBicicletaService({ id, numeroSerie }, body);
        handleSuccess(res, 200, "Bicicleta actualizada", updatedBici);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteBici(req, res){
    try {
        const { id, numeroSerie } = req.query;
        const querySchema = Joi.object({
            id: Joi.number().integer(),
            numeroSerie: Joi.string().case("upper"),
        });

        const { error } = querySchema.validate({ id, numeroSerie });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const deletedBici = await deleteBicicletaService({ id, numeroSerie });
        handleSuccess(res, 200, "Bicicleta eliminada", deletedBici);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
