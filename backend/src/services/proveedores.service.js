"use strict";
import Proveedores from "../entity/proveedores.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function updateProvService(query, body) {
    try {
        const { id, rutProveedor } = query;

        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rutProveedor: rutProveedor }],
        });
        
        if (!provFound) return [null, "Proveedor no encontrado"];
        
        const existingProv = await provRepository.findOne({
            where: [{ rutProveedor: body.rutProveedor }]
        });
        
        if (existingProv && existingProv.id !== provFound.id) {
            return [null, "Ya existe un proveedor con ese rut"];
        }
        
        const dataProvUpdated = {
            rutProveedor: body.rutProveedor,
            nombreProveedor: body.nombreProveedor,
            emailProveedor: body.emailProveedor,
            telefonoProveedor: body.telefonoProveedor,
            updatedAt: new Date(),
        }
        
        await provRepository.update({ id: provFound.id }, dataProvUpdated);
        
        const provData = await provRepository.findOne({
            where: { id: provFound.id },
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
        const { id, rutProveedor } = query;
        
        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rutProveedor: rutProveedor }],
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
        const { id, rutProveedor } = query;
        
        const provRepository = AppDataSource.getRepository(Proveedores);
        
        const provFound = await provRepository.findOne({
            where: [{ id: id }, { rutProveedor: rutProveedor }],
        });
        
        if (!provFound) return [null, "Proveedor no encontrado"];
        
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
        
        const newProv = provRepository.create({
            rutProveedor: body.rutProveedor,
            nombreProveedor: body.nombreProveedor,
            emailProveedor: body.emailProveedor,
            telefonoProveedor: body.telefonoProveedor,
        });

        const provSaved = await provRepository.save(newProv);

        return [provSaved, null];
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}