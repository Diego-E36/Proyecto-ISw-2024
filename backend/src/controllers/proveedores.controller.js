"use strict";
import {
    createProvService,
    deleteProvService,
    getAllProvService,
    getProvService,
    updateProvService,
} from "../services/proveedores.service.js";

import {
    provBodyValidation,
    provQueryValidation,
} from "../validations/proveedores.validation.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getProv(req, res) {
    try {
        const { id } = req.params;
        const { rut } = req.query;

        const { error } = provQueryValidation.validate({ id, rut });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [proveedor, errorProv] = await getProvService({ id, rut });

        if (errorProv) return handleErrorClient(res, 404, errorProv);

        handleSuccess(res, 200, "Proveedor encontrado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateProv(req, res) {
    try {
        const { id } = req.params;
        const { body } = req

        const { error:queryError } = provQueryValidation.validate({ id });

        if (queryError) return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);

        const { error:bodyError } = provBodyValidation.validate(body);
    
        if (bodyError) return handleErrorClient(res, 418, "Error de validación en los datos enviados", bodyError.message);

        const [proveedor, errorProv] = await updateProvService({ id }, body);

        if (errorProv) return handleErrorClient(res, 404, errorProv);

        handleSuccess(res, 200, "Proveedor actualizado correctamente", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProv(req, res) {
    try {
        const { id } = req.params;

        const { error:queryError } = provQueryValidation.validate({ id });
        
        // Validar query
        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const [proveedorDelete, errorProv] = await deleteProvService({ id });

        if (errorProv && errorProv === "caso 1") {
            return handleErrorClient(res, 404, "Proveedor no encontrado");
        } else if (errorProv === "caso 2") {
            return handleErrorServer(res, 418, "Proveedor tiene asignado al menos un item de inventario");
        }

        handleSuccess(res, 200, "Proveedor eliminado correctamente", proveedorDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createProv(req, res) {
    try {
        const proveedor = req.body;

        // Validacion de esquema
        const { error:bodyError } = provBodyValidation.validate(proveedor);
        if (bodyError) return handleErrorClient(res, 400, "Error de validación en los datos enviados", bodyError.message);

        // Error al crear proveedor
        const [newProveedor, errorNewProveedor] = await createProvService(proveedor);

        if (errorNewProveedor) return handleErrorClient(res, 400, errorNewProveedor);

        // En caso de no haber errores
        handleSuccess(res, 201, "Proveedor creado", newProveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllProv(req, res) {
    try {
        const [proveedores, errorProv] = await getAllProvService();

        if (errorProv) return handleErrorServer(res, 500, errorProv);

        proveedores.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Proveedores encontrados", proveedores);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}