"use strict";
import { AppDataSource } from "../config/configDb.js";
import Inventario from "../entity/inventario.entity.js";
import Bicicleta from "../entity/bicicleta.entity.js";
import User from "../entity/user.entity.js"; 

import Servicio from "../entity/servicio.entity.js";

import RelacionalInvServ from "../entity/relacionalInvServ.js";

import { format } from "rut.js";

import { updateInvService } from "../services/inventario.service.js";
import { createHistorialService } from "../services/historial.service.js";

import { createNotificactionService } from "../services/notificaciones.service.js";

export async function createServicioService(dataServicio) {
    try{
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        const userRepository = AppDataSource.getRepository(User);
        const bicicletaRepository = AppDataSource.getRepository(Bicicleta);
        const servicioRepository = AppDataSource.getRepository(Servicio);

        const relacionRepository = AppDataSource.getRepository(RelacionalInvServ);

        const inventario = await inventarioRepository.findOne({ where: { numeroSerie: dataServicio.item } });

        if (!inventario) return [null, "Item no encontrado"];

        const user = await userRepository.findOne({ where: { rut: format(dataServicio.rut) } });
        if (!user) return [null, "Usuario no encontrado"];

        const bicicleta = await bicicletaRepository.findOne({ where: { numeroSerie: dataServicio.bicicleta } });
        
        if (!bicicleta) return [null, "bicicleta no encontrada"];

        if(bicicleta.venta !== 0) {
            return [null, "No se puede crear un servicio con una bicicleta a la venta"]
        }

        const stockEdit = inventario.cantidadStock-dataServicio.cantidad

        if (stockEdit <= 0) return [null, "Cantidad mayor que el stock"];

        const newServicio = servicioRepository.create({
            bicicleta: bicicleta.numeroSerie,
            item: inventario.numeroSerie,
            rut: user.rut,
            tipo: dataServicio.tipo,
            valor: dataServicio.valor,
            descripcion: dataServicio.descripcion,
            duracionMins: dataServicio.duracionMins,
            cantidad: dataServicio.cantidad
        });

        const servicioSaved = await servicioRepository.save(newServicio);
        if(servicioSaved){
        const newRelacion = relacionRepository.create({
            idServicio: servicioSaved.id,
            numSerie: inventario.numeroSerie,
            cantidad: dataServicio.cantidad
        })
        const relacionSaved = await relacionRepository.save(newRelacion);
            if(relacionSaved) {
                await updateInvService({ id: inventario.id }, { cantidadStock: stockEdit });
                const updatedInv = await inventarioRepository.findOne({ where: { numeroSerie: dataServicio.item } });
                await createHistorialService({ id: inventario.id, cantidadStock: stockEdit });
                await createNotificactionService(updatedInv, "updateStock", dataServicio.cantidad);
            }
        }

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

        const relacionRepository = AppDataSource.getRepository(RelacionalInvServ);

            const servicioFound = await servicioRepository.findOne({ where: { id: id } });
            if (!servicioFound) return [null, "Servicio no encontrado"];
    
            const inventario = await inventarioRepository.findOne({ where: { numeroSerie: body.item } });
            if (!inventario) return [null, "Item no encontrado"];
    
            const user = await userRepository.findOne({ where: { rut: format(body.rut) } });
            if (!user) return [null, "Usuario no encontrado"];
    
            const bicicleta = await bicicletaRepository.findOne({ where: { numeroSerie: body.bicicleta } });
            if (!bicicleta) return [null, "Bicicleta no encontrada"];

            if(bicicleta.venta !== 0) {
                return [null, "No se puede crear un servicio con una bicicleta a la venta"]
            }

            const relacion = await relacionRepository.findOne({ where: { idServicio: servicioFound.id, numSerie: inventario.numeroSerie } });
            if (!relacion) return [null, "Relación no encontrada"];

            const updatedCantidad = inventario.cantidadStock + relacion.cantidad - body.cantidad;

            if (updatedCantidad <= 0) {
                return [null, "Cantidad mayor que el stock"];
            }
    
            const dataServicio = {
                bicicleta: bicicleta.numeroSerie,
                item: inventario.numeroSerie,
                rut: user.rut,
                tipo: body.tipo,
                estado: body.estado,
                valor: body.valor,
                descripcion: body.descripcion,
                duracionMins: body.duracionMins,
                cantidad: body.cantidad,
                updatedAt: new Date(),
            };
    
            // Actualizar servicio
            const result = await servicioRepository.update({ id: id }, dataServicio);
            if (!result.affected) return [null, "Error al actualizar el servicio"];

            // Actualizar relación
            await relacionRepository.update({ id: relacion.id }, { cantidad: body.cantidad }, relacion);
            
            // Actualizar inventario y crear historial
            await updateInvService({ id: inventario.id }, { cantidadStock: updatedCantidad });

            const updatedInv = await inventarioRepository.findOne({ where: { numeroSerie: body.item } });
            await createHistorialService({ id: inventario.id, cantidadStock: updatedCantidad });

            await createNotificactionService(updatedInv , "updateStock", body.cantidad);

            // Obtener servicio actualizado
            const servicioUpdated = await servicioRepository.findOne({ where: { id: id } });
            return [servicioUpdated, null];
        } catch (error) {
            console.error("Error al actualizar el servicio:", error.message, error.stack);
            return [null, "Error interno del servidor"];
        }
}

