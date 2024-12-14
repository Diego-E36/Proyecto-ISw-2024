"use strict";
import {
    createServicioService,
    getAllServiciosService,
    updateServicioService,
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

export async function createServicio(req, res){
    try{
        const servicio = req.body;

        // Validación del esquema de datos
        const { error } = servicioBodySchema.validate(servicio);
        if(error) return handleErrorClient(res, 400, "Error de validación en los datos", error.message);

        const [servicioCreated, errorServicio] = await createServicioService(servicio);

        if(errorServicio === "No se puede crear un servicio con una bicicleta a la venta") return handleErrorClient(res, 418, "Bicicleta a la venta", errorServicio);

        if(errorServicio) return handleErrorClient(res, 400, errorServicio);

        handleSuccess(res, 201, "Servicio creado", servicioCreated);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllServicios(req, res){
    try{
        const [servicios, errorServicios] = await getAllServiciosService();

        if(errorServicios) return handleErrorClient(res, 404, errorServicios);

        servicios.length === 0
            ? handleSuccess(res, 204, "No hay servicios registrados", {}) : handleSuccess(res, 200, "Servicios encontrados", servicios);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateServicio(req, res){
    try{
        const { id } = req.params;
        const { body } = req;

        const { error: queryError } = servicioBodySchema.validate(body);

        if(queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const { error: bodyError } = servicioQuerySchema.validate( { id } );

        if(bodyError) return handleErrorClient(res, 400, "Error de validación en los datos enviados aaa", bodyError.message);

        const [servicio, errorServicio] = await updateServicioService({ id }, body);

        if(errorServicio) return handleErrorClient(res, 404, errorServicio);

        handleSuccess(res, 200, "Servicio actualizado", servicio);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

