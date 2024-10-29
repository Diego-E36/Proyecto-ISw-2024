"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicleta  from "../entity/bicicleta.entity.js";

export async function createBicicletaService(dataBicicleta) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
        const newBicicleta = bicicletaRepository.create({
            id: dataBicicleta.id,
            marca: dataBicicleta.marca,
            modelo: dataBicicleta.modelo,
            color: dataBicicleta.color,
            tipo: dataBicicleta.tipo
        });

        return await bicicletaRepository.save(newBicicleta);

    } catch (error) {
        console.error("Error al crear una bicicleta: ", error);
    }
}

export async function getBicicletasService() {
    try {
        const { id, numeroSerie, marca, modelo, color, tipo } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie }, { marca: marca }, { modelo: modelo },
                { color: color }, { tipo: tipo }],
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
        const { id, numeroSerie, marca, modelo, color, tipo } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: body.id }, { numeroSerie: body.numeroSerie },{ marca: body.marca }, { modelo: body.modelo },
                { color: body.color }, { tipo: body.tipo }],
        });

        if(!bicicletaFound) return [null, "Bicicleta no encontrada"];

        const existingBicicleta = await bicicletaRepository.findOne({
            where: [{ numeroSerie: body.numeroSerie }, { marca: body.marca }, { modelo: body.modelo },
                { color: body.color }, { tipo: body.tipo }],
        });

        if (existingBicicleta && existingBicicleta.id !== bicicletaFound.id) {
            return [null, "Ya existe una bicicleta con estos datos"];
        }

        const dataBicicleta = {
            id: body.id,
            numeroSerie: body.numeroSerie,
            marca: body.marca,
            modelo: body.modelo,
            color: body.color,
            tipo: body.tipo,
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
    } catch (e){
        console.error("Error al actualizar la bicicleta: ", e);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteBicicletaService(query) {
    try{
        const { id, numeroSerie, marca, modelo, color, tipo } = query;

        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);

        const bicicletaFound = await bicicletaRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie },{ marca: marca }, { modelo: modelo },
                { color: color }, { tipo: tipo }],
        });

        if (!bicicletaFound) return [null, "Bicicleta no encontrada"];

        const bicicletaDeleted = await bicicletaRepository.remove(bicicletaFound);

        const { ...dataBicicleta } = bicicletaDeleted;

        return [dataBicicleta, null];
    }catch (e){
        console.error("Error al eliminar la bicicleta: ", e);
        return [null, "Error interno del servidor"];
    }
}