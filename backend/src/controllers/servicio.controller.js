"use strict";
import {
    createServicio,
    deleteServicio,
    getAllServicios,
    getServicio,
    updateServicio,
} from "../services/servicio.service.js";

import{
    handleErrorClient,
    handleErrorServer,
    handleSuccess
} from "../handlers/responseHandlers.js";

import {
    servicioBodySchema,
    servicioQuerySchema
} from "../validations/servicio.validation.js";

export async function getServicioController(req, res){
    try{
        const { id } = req.params;
        const { id_bicicleta, id_usuario } = req.query;

        const { error } = servicioQuerySchema.validate({ id, id_bicicleta, id_usuario });

        if(error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [servicio, errorServicio] = await getServicio({ id, id_bicicleta, id_usuario });

        if(errorServicio) return handleErrorClient(res, 404, errorServicio);

        handleSuccess(res, 200, "Servicio encontrado", servicio);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllServiciosController(req, res){
    try{
        const [servicios, errorServicios] = await getAllServicios();

        if(errorServicios) return handleErrorClient(res, 404, errorServicios);

        servicios.length === 0
            ? handleSuccess(res, 204, "No hay servicios registrados", {})
            : handleSuccess(res, 200, "Servicios encontrados", servicios);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function createServicioController(req, res){
    try{
        const servicio = req.body;

        // Validación del esquema de datos
        const { error } = servicioBodySchema.validate(servicio);
        if(error) return handleErrorClient(res, 400, "Error de validación en los datos", error.message);

        const [servicioCreated, errorServicio] = await createServicio(servicio);

        if(errorServicio) return handleErrorClient(res, 400, errorServicio);

        handleSuccess(res, 201, "Servicio creado", servicioCreated);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateServicioController(req, res){
    try{
        const { id, id_bicicleta, id_usuario } = req.query;
        const { body } = req;

        const { error: queryError } = servicioBodySchema.validate(body);

        if(queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const { error: bodyError } = servicioQuerySchema.validate({ id, id_bicicleta, id_usuario });

        if(bodyError) return handleErrorClient(res, 400, "Error de validación en los datos enviados", bodyError.message);

        const [servicio, errorServicio] = await updateServicio({ id, id_bicicleta, id_usuario }, body);

        if(errorServicio) return handleErrorClient(res, 404, errorServicio);

        handleSuccess(res, 200, "Servicio actualizado", servicio);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteServicioController(req, res){
    try{
        const { id } = req.query;

        const { error } = servicioQuerySchema.validate({ id });

        if(error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [servicio, errorServicio] = await deleteServicio({ id });

        if(errorServicio) return handleErrorClient(res, 404, errorServicio);

        handleSuccess(res, 200, "Servicio eliminado", servicio);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}