"use strict";
import { AppDataSource } from "../config/configDb.js";
import Materiales from "../entity/materiales.entity.js"

// Método para crear un nuevo material
export async function createMaterialService(data) {
    try {
        const materialRepository = AppDataSource.getRepository(Materiales)

        const newMaterial = materialRepository.create({
            materialId: data.materialId,
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
export async function getMaterialByIdService(query) {
    try {
        const { id, materialId } = query;

        const materialRepository = AppDataSource.getRepository(Materiales);

        const matFound = await materialRepository.findOne({ 
            where: [{ id: id }, { materialId: materialId }],
        });

        if (!matFound) return [null, "Item de materiales no encontrado"];

        const { ...matData } = matFound;

        return [matData , null];  
    } catch (error) {
        console.error("Error al obtener item de materiales:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para actualizar un material
export async function updateMaterialService(query, body) {
    try {
        const { id, materialId } = query;
        const materialRepository = AppDataSource.getRepository(Materiales);

        // Verificar si el material existe
        const matFound = await materialRepository.findOne({ 
            where: [{ id: id }, { materialId: materialId }], 
        });

        if (!matFound) return [null, "Item de materiales no encontrado"];

        // Verificar si el materialId se repite
        const existingMat = await materialRepository.findOne({
            where: [{ materialId: body.materialId }]
        });

        if (existingMat && existingMat.id !== matFound.id){
            return [null, "Ya existe un item con ese id"];
        }

        // Crear el objeto de actualización con solo los campos presentes en `body`
        const dataMatUpdated = {
            materialId: body.materialId,
            name: body.name ,
            quantity: body.quantity ,
            minQuantity: body.minQuantity ,
            supplier: body.supplier ,
            suggestedRestock: body.suggestedRestock ,
            lastUpdated: new Date(),
        }

        // Actualizar el material en la base de datos
        await materialRepository.update({ id: matFound.id }, dataMatUpdated);

        const matData = await materialRepository.findOne({
            where: { id: matFound.id },
        });

        if (!matData) {
            return [null, "Item no encontrado"]
        }

        const { ...matUpdated } = matData;
        
        return [matUpdated, null];
    } catch (error) {
        console.error("Error al modificar los materiales:", error);
        return [null, "Error interno del servidor"];
    }
}

// Método para eliminar un material
export async function deleteMaterialService(query) {    
    try {
        const { id, materialId } = query;
        
        const materialRepository = AppDataSource.getRepository(Materiales);

        // Verificar si el material existe
        const matFound = await materialRepository.findOne({ 
            where: [{ id: id }, { materialId: materialId }],
        });

        if (!matFound) return [null, "Item de materiales no encontrado"];

        // Eliminar el material encontrado
        const matDeleted = await materialRepository.remove(matFound);

        const { ...matData } = matDeleted;

        return [matData, null];
        
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
        const materialsBelowThreshold = await materialRepository.createQueryBuilder("materiales")
        .where("materiales.quantity < materiales.minQuantity")
        .getMany();

        if (!materialsBelowThreshold || materialsBelowThreshold.length === 0) return [null , "No hay items bajo umbral"];

        const materialData = materialsBelowThreshold.map(({ ...mat }) => mat);

        return [materialData, null];
    } catch (error) {
        console.error("Error al verificar los materiales:", error);
        return [null, "Error interno del servidor"];
    }
}


