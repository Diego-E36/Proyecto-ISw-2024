"use strict";
//aquí irá lo de la actualización periódica de las estadísticas
import { AppDataSource } from "../config/configDb.js";
import Estadisticas from "../entity/estadisticas.entity.js";
import Inventario  from "../entity/inventario.entity.js";
import { LessThan } from "typeorm";
import { Between } from "typeorm";
import { In } from "typeorm";

//Guarda interacción del operador (aún falta implementar)
export async function saveOperatorInteractionService(interactionData){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);
        //crea nueva interacción en la bd
        const newInteraction = estadisticasRepository.create(interactionData);
        //guarda la interacción
        await estadisticasRepository.save(newInteraction);
        return [newInteraction, null];

    } catch (error) {
        console.error("Error al guardar la interacción del operador:", error);
        return [null, "Error interno del servidor"];
    }
}

//Obtiene estadisticas generales para mostrar los gráficos (aún falta implementar)
export async function getGeneralEstadisticasService(){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);
        //obtiene todas las estadísticas generales para los gráficos
        const generalEstadisticas = await estadisticasRepository.find();

        if (!generalEstadisticas || generalEstadisticas.length === 0) 
            return [null, "No hay datos para mostrar en los gráficos"];

        //retorna las estadísticas generales
        return [generalEstadisticas, null];
    }catch (error) {
        console.error("Error al obtener las estadísticas generales:", error);
        return [null, "Error interno del servidor"];
    }
}

//Verifica acceso de un operador(admin) (aún falta implementar)
export async function verifyOperatorAccessService(UserData){
    try {
        //verifica si el operador tiene rol de admin
        if (operador.role !== "administrador"){
            return [null, "Acceso denegado: No tienes permisos de administrador"];
        } 
        return [true, null];
    } catch (error) {
        console.error("Error al verificar el acceso del operador:", error);
        return [null, "Error interno del servidor"];
    }
}

//Obtiene estadísticas del inventario, retorna total y el bajo stock (funciona)
export async function obtenerEstadisticasInventario() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        //Contar el total de productos en inventario
        const totalItems = await inventarioRepository.count();

        //Productos con bajo stock
        const lowStockItems = await inventarioRepository.find({
        where: { cantidadStock: LessThan(5) },
        select: ["id", "nombreStock", "cantidadStock"]
    });

    
        return [totalItems, lowStockItems];

    } catch (error) {
    console.error("Error obteniendo estadísticas del inventario:", error);
    return [null, "Error interno del servidor"];
    }
}


// Función para obtener el rango de fechas de una estación
function obtenerRangoFechasEstacion(estacion) {
    const year = new Date().getFullYear();
    switch (estacion) {
        case "Otoño":
            return [new Date(`${year}-03-21`), new Date(`${year}-06-20`)];
        case "Invierno":
            return [new Date(`${year}-06-21`), new Date(`${year}-09-20`)];
        case "Primavera":
            return [new Date(`${year}-09-21`), new Date(`${year}-12-20`)];
        case "Verano":
            return [new Date(`${year}-12-21`), new Date(`${year + 1}-03-20`)];
        default:
            throw new Error("Estación no válida");
    }
}

// Genera estadísticas por estaciones del año (probando)
export async function getEstadisticasxEstacionService(estacion) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener el rango de fechas para la estación especificada
        const [fechaInicio, fechaFin] = obtenerRangoFechasEstacion(estacion);

        // Obtener los elementos del inventario actualizados en la estación especificada
        const inventarioEnEstacion = await inventarioRepository.find({
            where: {
                updatedAt: Between(fechaInicio, fechaFin)
            }
        });

        if (!inventarioEnEstacion || inventarioEnEstacion.length === 0) {
            return [null, "No hay elementos del inventario creados en la estación especificada"];
        }

        // Obtener las estadísticas relacionadas con las fechas de actualización del inventario filtrado
        const estadisticasFiltradas = await inventarioRepository.find({
            where: {
                updatedAt: Between(fechaInicio, fechaFin)
            }
        });

        if (!estadisticasFiltradas || estadisticasFiltradas.length === 0) {
            return [null, "No hay estadísticas relacionadas con los elementos del inventario en la estación especificada"];
        }

        return [estadisticasFiltradas, null];
    } catch (error) {
        console.error("Error al obtener las estadísticas por estación:", error);
        return [null, "Error interno del servidor"];
    }
}