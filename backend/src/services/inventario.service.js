"use strict";
import Inventario from "../entity/inventario.entity.js";
import Proveedores from "../entity/proveedores.entity.js";
import { AppDataSource } from "../config/configDb.js";


export async function updateInvService(query, body) {
    try {
        const { id } = query;
        
        const invRepository = AppDataSource.getRepository(Inventario);
        const proveedorRepo = AppDataSource.getRepository(Proveedores);

        const invFound = await invRepository.findOne({
            where: [{ id: id }],
        });

        // Verificar si el item del inventario existe
        if (!invFound) return [null, "Item del inventario no encontrado"];


        if (body.numeroSerie !== undefined) {
            const inventario = await invRepository.findOne({ where: { numeroSerie: body.numeroSerie } });
            if (inventario) return [null, "Item repetido"];
        }

        // Verificar si el proveedor ya existe
        const proveedorFind = await proveedorRepo.findOne({ where: { id: body.id_proveedor } });

        if (!proveedorFind) return [null, "Proveedor no encontrado"];

        const dataInvUpdated = {
            numeroSerie: body.numeroSerie,
            nombreStock: body.nombreStock,
            cantidadStock: body.cantidadStock,
            descripcionUnidad: body.descripcionUnidad,
            precioUnidad: body.precioUnidad,
            marcaUnidad: body.marcaUnidad,
            id_proveedor: body.id_proveedor,
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
        const proveedorRepo = AppDataSource.getRepository(Proveedores);

        // Verificar si el proveedor ya existe
        const proveedor = await proveedorRepo.findOne({ where: { id: dataInventario.id_proveedor } });

        if (!proveedor) return [null, "Proveedor no encontrado"];

        // Prints de control

        // console.log(proveedor.nombre)
        // console.log(dataInventario.nombreStock)

        // Crear el producto en el inventario
        const newInv = invRepository.create({
            numeroSerie: dataInventario.numeroSerie,
            nombreStock: dataInventario.nombreStock,
            cantidadStock: dataInventario.cantidadStock,
            descripcionUnidad: dataInventario.descripcionUnidad,
            precioUnidad: dataInventario.precioUnidad,
            marcaUnidad: dataInventario.marcaUnidad,
            id_proveedor: dataInventario.id_proveedor,
            restockSugerido: dataInventario.restockSugerido,
            umbralMinimo: dataInventario.umbralMinimo,
            boolMateriales: dataInventario.boolMateriales,
        });

        // Guardar el producto en el inventario
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
