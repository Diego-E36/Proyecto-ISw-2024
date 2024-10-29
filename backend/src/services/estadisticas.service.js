"use strict";
//aquí irá lo de la actualización periódica de las estadísticas
import { AppDataSource } from "../config/configDb.js";
import Estadisticas from "../entity/estadisticas.entity.js";
import Inventario  from "../entity/inventario.entity.js";

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

//Genera estadísticas por estaciones  (aún falta implementar)
export async function getEstadisticasxEstacionesService(season){
    try {
        const estadisticasRepository = AppDataSource.getRepository(Estadisticas);

        const estacionesEstadisticas = await estadisticasRepository.find({
            where: { season: season },
        });
        
        if (!estacionesEstadisticas || estacionesEstadisticas.length === 0) 
            return [null, "No hay estadísticas para la estación"];


    } catch (error) {
        console.error("Error al obtener las estadísticas por estaciones:", error);
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

//Obtiene estadísticas del inventario (probando)
export async function obtenerEstadisticasInventario() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Contar el total de productos en inventario
        const totalItems = await inventarioRepository.count();

        // Contar los productos con bajo stock
        const lowStockItems = await inventarioRepository.count({
        where: { cantidadStock: { $lt: 5 } },
    });

        return [totalItems, lowStockItems];

    } catch (error) {
    console.error("Error obteniendo estadísticas del inventario:", error);
    return [null, "Error interno del servidor"];
}
}
