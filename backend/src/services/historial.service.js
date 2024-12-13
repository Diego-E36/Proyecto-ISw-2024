"use strict";
import Historial from "../entity/historialInventario.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createHistorialService(dataInventario) {
    try {
        const historialRepository = AppDataSource.getRepository(Historial);

        const newHist = historialRepository.create({
            id_inventario: dataInventario.id,
            cantidad: dataInventario.cantidadStock,
            updatedAt: dataInventario.updatedAt
        });

        const histSaved = await historialRepository.save(newHist);

        return [histSaved, null];
    } catch (error) {
        console.error("Error al crear el historial:", error);
        return [null, error.message];
    }
}

export async function getHistorialService(query) {
    try {
        const { id } = query;

        const historialRepository = AppDataSource.getRepository(Historial);

        const historialFound = await historialRepository.findOne({
            where: [{ id: id }],
        });

        if (!historialFound) return [null, "Historial no encontrado"];

        const { ...historial } = historialFound;

        return [historial, null];
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        return [null, error.message];
    }
}

export async function getAllHistorialService() {
    try {
        const historialRepository = AppDataSource.getRepository(Historial);

        const historial = await historialRepository.find();

        if (!historial || historial.length === 0) return [null, "No hay historial"];

        const historialData = historial.map(({ ...hist }) => hist);

        return [historialData, null];
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        return [null, error.message];
    }
}