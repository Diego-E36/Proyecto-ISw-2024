"use strict";
import { AppDataSource } from "../config/configDb.js";
import Inventario from "../entity/inventario.entity.js";
import { LessThan } from "typeorm";
import { Between } from "typeorm";

// Servicio para obtener el nombre del producto y la cantidad
export async function getNombreYCantidadInventario() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener el nombre del producto y la cantidad
        const inventario = await inventarioRepository.find({
            select: ["nombreStock", "cantidadStock"]
        });

        return [inventario, null];
    } catch (error) {
        console.error("Error al obtener el nombre y la cantidad del inventario:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener la distribución de productos por proveedor
export async function getDistribucionProductosPorProveedor() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener la distribución de productos por proveedor
        const productosPorProveedor = await inventarioRepository.createQueryBuilder("inventario")
            .select("inventario.proveedor, COUNT(*) as cantidad")
            .groupBy("inventario.proveedor")
            .getRawMany();

        return [productosPorProveedor, null];
    } catch (error) {
        console.error("Error al obtener la distribución de productos por proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener productos con bajo stock y restock sugerido, con umbralMinimo
export async function getProductosBajoStockYRestockSugerido() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener productos con bajo stock
        const productosBajoStock = await inventarioRepository.createQueryBuilder("inventario")
        .select(["inventario.id", "inventario.nombreStock", "inventario.cantidadStock", "inventario.restockSugerido", "inventario.umbralMinimo"])
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .getMany();

        return [productosBajoStock, null];

    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido:", error);
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
