"use strict";
import { AppDataSource } from "../config/configDb.js";
import Inventario from "../entity/inventario.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import User from "../entity/user.entity.js"; 



import Servicio from "../entity/servicio.entity.js";

export async function createServicioService(dataServicio) {
    try{
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const userRepository = AppDataSource.getRepository(User);
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const inventario = await inventarioRepository.findOne({ where: { id: dataServicio.id_inventario } });

        if (!inventario) return [null, "Item no encontrado"];

        const user = await userRepository.findOne({ where: { id: dataServicio.id_usuario } });

        if (!user) return [null, "Usuario no encontrado"];

        const bicicleta = await bicicletaRepository.findOne({ where: { id: dataServicio.id_bicicleta } });
        
        if (!bicicleta) return [null, "bicicleta no encontrada"];

        const newServicio = servicioRepository.create({
            id_bicicleta: dataServicio.id_bicicleta,
            id_inventario: dataServicio.id_inventario,
            id_usuario: dataServicio.id_usuario,
            tipo: dataServicio.tipo,
            valor: dataServicio.valor,
            descripcion: dataServicio.descripcion,
            duracionMins: dataServicio.duracionMins
        });

        const servicioSaved = await servicioRepository.save(newServicio);

        return [servicioSaved, null];

    }catch(error){
        console.error("Error al crear un servicio: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllServiciosService() {
    try{
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const servicios = await servicioRepository.find();

        if(!servicios || servicios.length === 0) return [null, "No hay servicios registrados"];

        return [servicios, null];
    }catch(error){
        console.error("Error al obtener los servicios: ", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateServicioService(query, body) {
    try{
        const { id } = query;
    
            const inventarioRepository = AppDataSource.getRepository(Inventario);
            const userRepository = AppDataSource.getRepository(User);
            const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
            const servicioRepository = AppDataSource.getRepository(Servicio);
    
            const servicioFound = await servicioRepository.findOne({ where: { id: id } });
            if (!servicioFound) return [null, "Servicio no encontrado"];
    
            const inventario = await inventarioRepository.findOne({ where: { id: body.id_inventario } });
            if (!inventario) return [null, "Item no encontrado"];
    
            const user = await userRepository.findOne({ where: { id: body.id_usuario } });
            if (!user) return [null, "Usuario no encontrado"];
    
            const bicicleta = await bicicletaRepository.findOne({ where: { id: body.id_bicicleta } });
            if (!bicicleta) return [null, "Bicicleta no encontrada"];
    
            const dataServicio = {
                id_bicicleta: body.id_bicicleta,
                id_inventario: body.id_inventario,
                id_usuario: body.id_usuario,
                tipo: body.tipo,
                estado: body.estado,
                valor: body.valor,
                descripcion: body.descripcion,
                duracionMins: body.duracionMins,
                updatedAt: new Date(),
            };
    
            const result = await servicioRepository.update({ id: id }, dataServicio);
            console.log("Resultado de la actualización:", result);
    
            const servicioUpdated = await servicioRepository.findOne({ where: { id: id } });
    
            return [servicioUpdated, null];
        } catch (error) {
            console.error("Error al actualizar el servicio:", error.message, error.stack);
            return [null, "Error interno del servidor"];
        }
}

