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
        const { rutProveedor } = req.query;

        const { error } = provQueryValidation.validate({ id, rutProveedor });

        if (error) return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);

        const [proveedor, errorProv] = await getProvService({ id, rutProveedor });

        if (errorProv) return handleErrorClient(res, 404, errorProv);

        handleSuccess(res, 200, "Proveedor encontrado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateProv(req, res) {
    try {
        const { id } = req.params;
        const { rutProveedor } = req.query;
        const body = req;

        const { error: queryError } = provQueryValidation.validate({ id, rutProveedor });

        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const { error: bodyError } = provBodyValidation.validate(body);

        if (bodyError) {
            return handleErrorClient(res, 400, "Error de validación en el cuerpo", bodyError.message);
        }

        const [proveedor, errorProv] = await updateProvService({ id, rutProveedor }, body);

        if (errorProv) return handleErrorClient(res, 500, "Error al actualizar el proveedor", errorProv);

        handleSuccess(res, 200, "Proveedor actualizado correctamente", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProv(req, res) {
    try {
        const { id } = req.query;

        const { error:queryError } = provQueryValidation.validate({ id });
        
        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }

        const [proveedorDelete, errorProv] = await deleteProvService({ id });

        if (errorProv) return handleErrorClient(res, 404,"Error eliminando el proveedor", errorProv);

        handleSuccess(res, 200, "Proveedor eliminado correctamente", proveedorDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function createProv(req, res) {
    try {
        const proveedor = req.body;

        // Validacion de esquema de los datos
        const { error } = provBodyValidation.validate(proveedor);
        if (error) return handleErrorClient(res, 400, "Error de validación en los datos enviados", error.message);

        // Verificacion de ruts duplicados
        const [existingProv, errorExistingProv] = await getProvService({ rutProveedor: proveedor.rutProveedor });

        if (errorExistingProv && errorExistingProv !== "Proveedor no encontrado") {
            return handleErrorServer(res, 500, "Error verificando duplicados", errorExistingProv);
        }

        if (existingProv) return handleErrorClient(res, 400, "Ya existe un proveedor con ese rut");

        const [newProv, errorProv] = await createProvService(proveedor);

        handleSuccess(res, 201, "Proveedor creado correctamente", newProv);
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