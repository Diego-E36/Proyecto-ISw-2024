"use strict";
import Proveedores from "../entity/proveedores.entity.js";
import Inventario from "../entity/inventario.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { format } from "rut.js";

export async function updateProvService(query, body) {
    try {
        const { id, rut } = query;

        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rut: format(rut) }],
        });
        
        if (!provFound) return [null, "Proveedor no encontrado"];

        const existingRut = await provRepository.findOne({
            where: [{rut: format(body.rut)}],
        });

        const existingName = await provRepository.findOne({
            where: [{nombre: body.nombre}],
        });

        const existingEmail = await provRepository.findOne({
            where: [{email: body.email}],
        });

        const exisitingPhone = await provRepository.findOne({
            where: [{telefono: body.telefono}],
        });

        if (existingRut && existingRut.id !== provFound.id) {
            return [null, "Ya existe un proveedor con ese rut"];
        }

        if (existingName && existingName.id !== provFound.id) {
            return [null, "Ya existe un proveedor con ese nombre"];
        }

        if (existingEmail && existingEmail.id !== provFound.id) {
            return [null, "Ya existe un proveedor con ese email"];
        }

        if (exisitingPhone && exisitingPhone.id !== provFound.id) {
            return [null, "Ya existe un proveedor con ese teléfono"];
        }
        
        const dataProvUpdated = {
            rut: format(body.rut),
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            updatedAt: new Date(),
        }
        
        await provRepository.update({ id: provFound.id }, dataProvUpdated);
        
        const provData = await provRepository.findOne({
            where: [{ id: provFound.id }],
        });
        
        if (!provData) {
            return [null, "Proveedor no encontrado después de actualizar"];
        }
        
        const { ...provUpdated } = provData;
        
        return [provUpdated, null];
    } catch (error) {
        console.error("Error al modificar el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProvService(query) {
    try {
        const { id, rut } = query;

        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rut: format(rut) }],
        });
        
        if (!provFound) return [null, "Proveedor no encontrado"];
        
        const { ...provData } = provFound;
        
        return [provData, null];
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllProvService() {
    try {
        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const prov = await provRepository.find();
        
        if (!prov || prov.length === 0) {
            return [null, "No se encontraron proveedores"];
        }
        
        const provData = prov.map(({ ...prov }) => prov);
        
        return [provData, null];
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteProvService(query) {
    try {
        const { id, rut } = query;
        
        const provRepository = AppDataSource.getRepository(Proveedores);
        
        // Verificar si el proveedor existe
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rut: format(rut) }],
        });
        
        if (!provFound) return [null, "caso 1"];
        
        // verificar que el proveedor no tenga un item de inventario asignado

        const inventoryRepo = AppDataSource.getRepository(Inventario);

        const inventoryFound = await inventoryRepo.findOne({
            where: { id_proveedor: provFound.id }
        })

        if (inventoryFound) {
            return [null, "caso 2"];
        }

        const provDeleted = await provRepository.remove(provFound);
        
        const { ...provData } = provDeleted;
        
        return [provData, null];
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createProvService(body) {
    try {
        const provRepository = AppDataSource.getRepository(Proveedores);

        const existingRut = await provRepository.findOne({
            where: [{rut: format(body.rut)}],
        });

        const existingName = await provRepository.findOne({
            where: [{nombre: body.nombre}],
        });
        
        const existingEmail = await provRepository.findOne({
            where: [{email: body.email}],
        });

        const exisitingPhone = await provRepository.findOne({
            where: [{telefono: body.telefono}],
        });

        if (existingRut) {
            return [null, "Ya existe un proveedor con ese rut"];
        }

        if (existingName) {
            return [null, "Ya existe un proveedor con ese nombre"];
        }

        if (existingEmail) {
            return [null, "Ya existe un proveedor con ese email"];
        }

        if (exisitingPhone) {
            return [null, "Ya existe un proveedor con ese teléfono"];
        }
        
        const newProv = provRepository.create({
            rut: format(body.rut),
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
        });

        const provSaved = await provRepository.save(newProv);

        return [provSaved, null];
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}