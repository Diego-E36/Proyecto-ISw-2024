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
        // Validación del cuerpo de la solicitud con Joi
        const { error, value } = materialesBodyValidation.validate(req.body, { abortEarly: false });

        if (error) {
            // Manejo de errores de validación
            const validationErrors = error.details.map((detail) => detail.message);
            return handleErrorClient(res, 400, validationErrors);
        }

        // Llamada al servicio con datos validados
        const [material, errorMessage] = await createMaterialService(value);

        if (errorMessage) {
            return handleErrorServer(res, errorMessage);
        }

        // Respuesta de éxito
        handleSuccess(res, 201, material);
    } catch (error) {
        console.error("Error al crear el material:", error.message);
        handleErrorServer(res, "Error al crear el material");
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
        // Validación de `id` en los parámetros de la solicitud
        const { error } = materialesQueryValidation.validate({ id: req.params.id });

        if (error) {
            // Si la validación falla, respondemos con los errores específicos
            const validationErrors = error.details.map((detail) => detail.message);
            return handleErrorClient(res, 400, validationErrors);
        }

        // Llamada al servicio con el `id` validado
        const [material, errorMessage] = await getMaterialByIdService(req.params.id);

        if (errorMessage) {
            return handleErrorClient(res, 404, errorMessage);
        }

        handleSuccess(res, 200, material);
    } catch (error) {
        console.error("Error al obtener el material:", error.message);
        handleErrorServer(res, "Error al obtener el material");
    }
}

    // Actualizar un material por ID
export async function updateMaterial(req, res) {
    try {
        // Validación del `id` en los parámetros de la solicitud
        const { error: queryError } = materialesQueryValidation.validate({ id: req.params.id });
        if (queryError) {
            const validationErrors = queryError.details.map((detail) => detail.message);
            return handleErrorClient(res, 400, validationErrors);
        }

        // Validación del cuerpo de la solicitud
        const { error: bodyError } = materialesBodyValidation.validate(req.body, { abortEarly: false });
        if (bodyError) {
            const validationErrors = bodyError.details.map((detail) => detail.message);
            return handleErrorClient(res, 400, validationErrors);
        }

        // Llamada al servicio con `id` y `body` validados
        const [updatedMaterial, errorMessage] = await updateMaterialService(req.params.id, req.body);

        if (errorMessage) {
            return handleErrorServer(res, errorMessage);
        }

        handleSuccess(res, 200, updatedMaterial);
    } catch (error) {
        console.error("Error al actualizar el material:", error.message);
        handleErrorServer(res, "Error al actualizar el material");
    }
}

    // Eliminar un material por ID
export async function deleteMaterial(req, res) {
    try {
        // Validación del `id` en los parámetros de la solicitud
        const { error } = materialesQueryValidation.validate({ id: req.params.id });
        if (error) {
            const validationErrors = error.details.map((detail) => detail.message);
            return handleErrorClient(res, 400, validationErrors);
        }

        // Llamada al servicio para eliminar el material
        const [result, errorMessage] = await deleteMaterialService(req.params.id);

        if (errorMessage) {
            return handleErrorClient(res, 404, errorMessage);
        }

        handleSuccess(res, 200, result);
    } catch (error) {
        console.error("Error al eliminar el material:", error.message);
        handleErrorServer(res, "Error al eliminar el material");
    }
}

    // Obtener materiales bajo el umbral mínimo de inventario
export async function getMaterialsBelowThreshold(req, res) {
    try {
        const materials = await getMaterialsBelowThresholdService();

        // Verifica si hay materiales bajo el umbral
        if (!materials || materials.length === 0) {
            return handleErrorClient(res, 404, "No hay materiales bajo el umbral mínimo de inventario.");
        }

        handleSuccess(res, 200, materials);
    } catch (error) {
        console.error("Error al verificar los materiales:", error.message);
        handleErrorServer(res, "Error al verificar los materiales");
    }
}