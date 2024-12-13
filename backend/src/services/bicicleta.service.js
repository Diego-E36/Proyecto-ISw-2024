"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import Servicio from "../entity/servicio.entity.js";

export async function createBicicletaService(dataBicicleta) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        
        const newBicicleta = bicicletaRepository.create({
            numeroSerie: dataBicicleta.numeroSerie,
            marca: dataBicicleta.marca,
            modelo: dataBicicleta.modelo,
            color: dataBicicleta.color,
            tipo: dataBicicleta.tipo,
            aro: dataBicicleta.aro,
            venta: dataBicicleta.venta
        });
        
        const bicicletaCreated = await bicicletaRepository.save(newBicicleta);

        return [bicicletaCreated, null];

    } catch (error) {
        console.error("Error al crear una bicicleta: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getBicicletaService(query) {
    try {
        const { id, numeroSerie } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie }],
        });

        if(!bicicletaFound) return [null, "Bicicleta no encontrada"];

        const { ...bicicletaData } = bicicletaFound;

        return [bicicletaData, null];
    } catch (error) {
        console.error("Error al obtener la bicicleta: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateBicicletaService(query, body) {
    try{
        const { id } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: id }],
        });

        if(!bicicletaFound) return [null, "Bicicleta no encontrada"];

        if (body.numeroSerie !== undefined) {
            const existingBicicleta = await bicicletaRepository.findOne({
                where: [{ numeroSerie: body.numeroSerie }]
            });

            if (existingBicicleta && existingBicicleta.id !== bicicletaFound.id) {
                return [null, "Ya existe una bicicleta con estos datos"];
            }
        }

        const serviciosFound = await servicioRepository.findOne({
            where: [{ bicicleta: bicicletaFound.numeroSerie }]
        });

        if(serviciosFound) return [null, "Bicicleta asociada a un Servicio"];

        const dataBicicleta = {
            numeroSerie: body.numeroSerie,
            marca: body.marca,
            modelo: body.modelo,
            color: body.color,
            tipo: body.tipo,
            aro: body.aro,
            venta: body.venta,
            updatedAt: new Date(),
        };

        await bicicletaRepository.update({ id: bicicletaFound.id }, dataBicicleta);

        const bicicletaData = await bicicletaRepository.findOne({
            where: [{ id: bicicletaFound.id }],
        });

        if (!bicicletaData) {
            return [null, "Bicicleta no encontrada después de actualizar"];
        }

        const { ...bicicletaUpdated } = bicicletaData;

        return [bicicletaUpdated, null];
    } catch (error){
        console.error("Error al actualizar la bicicleta: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteBicicletaService(query) {
    try{
        const { id } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const serviceRepository = AppDataSource.getRepository(Servicio);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: id }],
        });

        const serviceFound = await serviceRepository.findOne({
            where: [{ bicicleta: bicicletaFound.numeroSerie }]
        });

        if (serviceFound) return [null, "Bicicleta asociada a un Servicio"];

        if (!bicicletaFound) return [null, "Bicicleta no encontrada"];

        const bicicletaDeleted = await bicicletaRepository.remove(bicicletaFound);

        const { ...dataBicicleta } = bicicletaDeleted;

        return [dataBicicleta, null];
    }catch (error){
        console.error("Error al eliminar la bicicleta: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllBicicletaService() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const bicicleta = await bicicletaRepository.find();

        if (!bicicleta || bicicleta.length === 0) return [null, "No hay bicicletas registradas"];

        const bicicletaData = bicicleta.map(({ ...bicicleta }) => bicicleta);

        return [bicicletaData, null];
    } catch (error) {
        console.error("Error al obtener las bicicletas: ", error);
        return [null, "Error interno del servidor"];
    }
}
        