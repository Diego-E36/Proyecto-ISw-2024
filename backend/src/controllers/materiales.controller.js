"use strict";

import {
    createMaterialService,
    deleteMaterialService,
    getAllMaterialsService,
    getMaterialByIdService,
    getMaterialsBelowThresholdService,
    updateMaterialService,
} from "../services/materiales.service.js"

import {
    materialesBodyValidation,
    materialesQueryValidation,
} from "../validations/materiales.validation.js"

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";



    // Crear un nuevo material
export async function createMaterial(req, res) {
    try {
        const { body } = req;

        const { error } = materialesBodyValidation.validate(body);
    
        if (error)
            return handleErrorClient(res, 400, "Error de validación", error.message);
    
        const [newMat, errorNewMat] = await createMaterialService(body);
    
        if (errorNewMat) return handleErrorClient(res, 400, "Error registrando el material", errorNewMat);
    
        handleSuccess(res, 201, "material registrado", newMat);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

    // Obtener todos los materiales
export async function getAllMaterials(req, res) {
    try {
        const [materials, errorMessage] = await getAllMaterialsService();

        if (errorMessage) {
            return handleErrorServer(res, errorMessage);
        }

        handleSuccess(res, 200, materials);
    } catch (error) {
        console.error("Error al obtener los materiales:", error.message);
        handleErrorServer(res, "Error al obtener los materiales");
    }
}

    // Obtener un material por ID
export async function getMaterialById(req, res) {
    try {
        const { id } = req.params;
        const { materialId } = req.query; 
    
        const { error } = materialesQueryValidation.validate({ id, materialId });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [material, errorMat] = await getMaterialByIdService({ id, materialId });

        if (errorMat) return handleErrorClient(res, 404, errorMat);
        
        handleSuccess(res, 200, "Material encontrado", material);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

    // Actualizar un material por ID
export async function updateMaterial(req, res) {
    try {
        const { id } = req.params;
        const { materialId } = req.query;
        const { body } = req;

        const { error: queryError } = materialesQueryValidation.validate({ id, materialId });
        
        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        // Validación del cuerpo de la solicitud
        const { error: bodyError } = materialesBodyValidation.validate(body);
        
        if (bodyError) {
            return handleErrorClient(res, 400, "Error de validación en los datos enviados", bodyError);
        }

        // Llamada al servicio con `id` y `body` validados
        const [updatedMaterial, errorMat] = await updateMaterialService({ id, materialId }, body);

        if (errorMat) return handleErrorClient(res, 500, "Error modificando el item", errorMat);
        
        handleSuccess(res, 200, "Material modificado correctamente", updatedMaterial);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

    // Eliminar un material por ID
export async function deleteMaterial(req, res) {
    try {
        const { id } = req.params;
        const { materialId } = req.query;

        const { error: queryError } = materialesQueryValidation.validate({ id, materialId });
        
        if (queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        
        const [materialDelete, errorMat] = await deleteMaterialService({ id, materialId });

        if (errorMat) return handleErrorClient(res, 404, "Error elminando unidad", errorInv);
        
        handleSuccess(res, 200, "Unidad eliminada correctamente", materialDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

    // Obtener materiales bajo el umbral mínimo de inventario
export async function getMaterialsBelowThreshold(req, res) {
    try {
        const [materials, errorMat] = await getMaterialsBelowThresholdService();

        // Verifica si hay materiales bajo el umbral
        if (errorMat) return handleErrorClient(res, 404, errorMat);

        // Si no hay materiales bajo umbral, responde con 204
        if (!materials || materials.length === 0) {
            return handleSuccess(res, 204);
        }

        // Si hay materiales bajo el umbral, responde con 200 y los datos
        handleSuccess(res, 200, materials);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}