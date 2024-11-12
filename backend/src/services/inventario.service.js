"use strict";
import Inventario from "../entity/inventario.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function updateInvService(query, body) {
    try {
        const { id, numeroSerie } = query;
        
        const invRepository = AppDataSource.getRepository(Inventario);

        const invFound = await invRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie }],
        });

        if (!invFound) return [null, "Item del inventario no encontrado"];

        const existingInv = await invRepository.findOne({
            where: [{ numeroSerie: body.numeroSerie }]
        });

        if (existingInv && existingInv.id !== invFound.id) {
            return [null, "Ya existe un item con ese número de serie"];
        }

        const dataInvUpdated = {
            numeroSerie: body.numeroSerie,
            nombreStock: body.nombreStock,
            cantidadStock: body.cantidadStock,
            descripcionUnidad: body.descripcionUnidad,
            precioUnidad: body.precioUnidad,
            marcaUnidad: body.marcaUnidad,
            proveedor: body.proveedor,
            restockSugerido: body.restockSugerido,
            umbralMinimo: body.umbralMinimo,
            boolMateriales: body.boolMateriales,
            updatedAt: new Date(),
        }

        await invRepository.update({ id: invFound.id }, dataInvUpdated);

        const invData = await invRepository.findOne({
            where: { id: invFound.id },
        });

        if (!invData) {
            return [null, "Item del inventario no encontrado después de actualizar"];
        }

        const { ...invUpdated } = invData;

        return [invUpdated, null];
    } catch (error) {
        console.error("Error al modificar el inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getInvService(query) {
    try {
        const { id, numeroSerie } = query;

        const invRepository = AppDataSource.getRepository(Inventario);

        const invFound = await invRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie }],
        });

        if (!invFound) return [null, "Item del inventario no encontrado"];

        const { ...invData } = invFound;

        return [invData, null];
    } catch (error) {
        console.error("Error al obtener item del inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllInvService() {
    try {
        const invRepository = AppDataSource.getRepository(Inventario);

        const inventory = await invRepository.find();

        if (!inventory || inventory.length === 0) return [null, "No hay items registrados"];

        const inventoryData = inventory.map(({ ...inv }) => inv);

        return [inventoryData, null];
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteInvService(query) {
    try {
        const { id, numeroSerie } = query;
        
        const invRepository = AppDataSource.getRepository(Inventario);

        const invFound = await invRepository.findOne({
            where: [{ id: id }, { numeroSerie: numeroSerie }],
        });

        if (!invFound) return [null, "Item del inventario no encontrado"];

        const invDeleted = await invRepository.remove(invFound);

        const { ...invData } = invDeleted;
        
        return [invData, null];
    } catch (error) {
        console.error("Error al eliminar item del inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createInvService(dataInventario) {
    try {
        const invRepository = AppDataSource.getRepository(Inventario);

        const newInv = invRepository.create({
            numeroSerie: dataInventario.numeroSerie,
            nombreStock: dataInventario.nombreStock,
            cantidadStock: dataInventario.cantidadStock,
            descripcionUnidad: dataInventario.descripcionUnidad,
            precioUnidad: dataInventario.precioUnidad,
            marcaUnidad: dataInventario.marcaUnidad,
            proveedor: dataInventario.proveedor,
            restockSugerido: dataInventario.restockSugerido,
            umbralMinimo: dataInventario.umbralMinimo,
            boolMateriales: dataInventario.boolMateriales,
        });

        const invSaved = await invRepository.save(newInv);

        return [invSaved, null];
    } catch (error) {
        console.error("Error al crear item del inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para verificar el umbral de inventario y obtener materiales bajo el umbral
export async function getInvBelowThresholdService() {
    try {
        const invRepository = AppDataSource.getRepository(Inventario);

        // Obtener solo los materiales que están por debajo del umbral
        const InvBelowThreshold = await invRepository.createQueryBuilder("inventario")
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .getMany();

        if (!InvBelowThreshold || InvBelowThreshold.length === 0) return [null , "No hay items bajo umbral"];

        const invData = InvBelowThreshold.map(({ ...inv }) => inv);

        return [invData, null];
    } catch (error) {
        console.error("Error al verificar inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

// Importa la función y configura el intervalo de tiempo en milisegundos (ej. cada 5 minutos)
const CHECK_INTERVAL =  10 * 1000; // 10 segundos

async function monitorInvBelowThreshold() {
    const [Inv, error] = await getInvBelowThresholdService();

    if (error) {
        console.error("Error al obtener inventario:", error);
    } else if (Inv) {
        console.log("Inventario bajo el umbral:", Inv);
        // Aquí podrías enviar notificaciones, registrar el evento en logs, etc.
    }
}
// Ejecuta la función de monitoreo cada cierto tiempo
setInterval(monitorInvBelowThreshold, CHECK_INTERVAL);
