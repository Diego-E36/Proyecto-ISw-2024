"use strict";
import { AppDataSource } from "../config/configDb.js";
import Materiales from "../entity/materiales.entity.js"

// Método para crear un nuevo material
export async function createMaterialService(data) {
    try {
        const materialRepository = AppDataSource.getRepository(Materiales)

        const newMaterial = materialRepository.create({
            name: data.name,
            quantity: data.quantity,
            minQuantity: data.minQuantity,
            supplier: data.supplier,
            suggestedRestock: data.suggestedRestock,
            });

        const matSaved = await materialRepository.save(newMaterial)
        return [matSaved, null];
    } catch (error) {
        console.error("Error al crear el material:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para obtener todos los materiales
export async function getAllMaterialsService() {
    try {
        const materialRepository = AppDataSource.getRepository(Materiales);

        const materials = await materialRepository.find();

        if (!materials || materials.length === 0) return [null, "No hay items registrados"];

        const materialsData = materials.map(({ ...material }) => material);

        return [materialsData, null];
    } catch (error) {
        console.error("Error al obtener los materiales:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para obtener un material por su ID
export async function getMaterialByIdService({ id }) {
    if (!id) return [null, "El ID es requerido para la búsqueda"];

    try {
        const materialRepository = AppDataSource.getRepository(Materiales);

        const matFound = await materialRepository.findOne({ where: { id } });

        if (!matFound) return [null, "Item de materiales no encontrado"];

        return [matFound, null];  
    } catch (error) {
        console.error("Error al obtener item de materiales:", error.message);
        return [null, "Error interno del servidor"];
    }
}

// Método para actualizar un material
export async function updateMaterialService(query, body) {
    try {
        const { id } = query;
        const materialRepository = AppDataSource.getRepository(Materiales);

        // Verificar si el material existe
        const matFound = await materialRepository.findOne({ where: { id } });
        if (!matFound) return [null, "Item de materiales no encontrado"];

        // Crear el objeto de actualización con solo los campos presentes en `body`
        const dataMatUpdated = {
            ...(body.name && { name: body.name }),
            ...(body.quantity && { quantity: body.quantity }),
            ...(body.minQuantity && { minQuantity: body.minQuantity }),
            ...(body.supplier && { supplier: body.supplier }),
            ...(body.suggestedRestock && { suggestedRestock: body.suggestedRestock }),
            lastUpdated: new Date(),
        };

        // Actualizar el material en la base de datos
        await materialRepository.update(id, dataMatUpdated);

        // Devolver el material actualizado
        const updatedMaterial = { ...matFound, ...dataMatUpdated };
        return [updatedMaterial, null];
        
    } catch (error) {
        console.error("Error al modificar los materiales:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para eliminar un material
export async function deleteMaterialService(query) {    
    try {
        const { id } = query;
        
        const materialRepository = AppDataSource.getRepository(Materiales);

        // Verificar si el material existe
        const matFound = await materialRepository.findOne({ where: { id } });
        if (!matFound) return [null, "Item de materiales no encontrado"];

        // Eliminar el material encontrado
        const matDeleted = await materialRepository.remove(matFound);

        return [matDeleted, null];
        
    } catch (error) {
        console.error("Error al eliminar item de materiales:", error);
        return [null, "Error interno del servidor"];
    }
}


// Método para verificar el umbral de inventario y obtener materiales bajo el umbral
export async function getMaterialsBelowThresholdService() {
    try {
        const materialRepository = AppDataSource.getRepository(Materiales);

        // Obtener solo los materiales que están por debajo del umbral
        const materialsBelowThreshold = await materialRepository.find({
            where: { quantity: LessThan("minQuantity") },
        });

        return [materialsBelowThreshold, null];
    } catch (error) {
        console.error("Error al verificar los materiales:", error);
        return [null, "Error al verificar los materiales"];
    }
}


