"use strict";
import { AppDataSource } from "../config/configDb.js";
import Servicio from "../entity/servicio.entity.js";

export async function createServicioService(dataServicio) {
    try{
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const newServicio = servicioRepository.create({
            id_bicicleta: dataServicio.id_bicicleta,
            id_inventario: dataServicio.id_inventario,
            id_usuario: dataServicio.id_usuario,
            tipo: dataServicio.tipo,
            estado: dataServicio.estado,
            valor: dataServicio.valor,
            descripcion: dataServicio.descripcion,
            duracionMins: dataServicio.duracionMins
        });

        const servicioCreated = await servicioRepository.save(newServicio);

        return [servicioCreated, null];

    }catch(error){
        console.error("Error al crear un servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getServicioService(query) {
    try{
        const { id, id_bicicleta } = query;

        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicioFound = await servicioRepository.findOne({
            where: [{ id: id }, { id_bicicleta: id_bicicleta }],
        });

        if(!servicioFound) return [null, "Servicio no encontrado"];

        const { ...servicioData } = servicioFound;

        return [servicioData, null];
    }catch(error){
        console.error("Error al obtener el servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateServicioService(query, body) {
    try{
        const { id, id_bicicleta } = query;

        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicioFound = await servicioRepository.findOne({
            where: [{ id: id }, { id_bicicleta: id_bicicleta }],
        });

        if(!servicioFound) return [null, "Servicio no encontrado"];

        const dataServicio = {
            id_bicicleta: body.id_bicicleta,
            id_inventario: body.id_inventario,
            id_usuario: body.id_usuario,
            tipo: body.tipo,
            estado: body.estado,
            valor: body.valor,
            descripcion: body.descripcion,
            duracionMins: body.duracionMins
        };

        await servicioRepository.update(servicioFound, dataServicio);

        return [servicioFound, null];
    }catch(error){
        console.error("Error al actualizar el servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteServicioService(query) {
    try{
        const { id } = query;

        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicioFound = await servicioRepository.findOne({
            where: [{ id: id }],
        });

        if(!servicioFound) return [null, "Servicio no encontrado"];

        await servicioRepository.remove(servicioFound);

        return [servicioFound, null];
    }catch(error){
        console.error("Error al eliminar el servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllServiciosService() {
    try{
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicios = await servicioRepository.find();

        if(!servicios || servicios.length === 0) return [null, "No hay servicios registrados"];

        return [servicios, null];
    }catch(error){
        console.error("Error al obtener los servicios: ", error);
        return [null, "Error interno del servidor"];
    }
}