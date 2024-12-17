"use strict";
import { AppDataSource } from "../config/configDb.js";
import Inventario from "../entity/inventario.entity.js";
import { Between } from "typeorm";
import HistorialInventario from "../entity/historialInventario.entity.js";

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

// Servicio para obtener nombre de stock inventario, cantidad del historial filtrado por mes y año
export async function getInventarioNombreCantidadMesYear(mes, year) {
    try {
        const historialRepository = AppDataSource.getRepository(HistorialInventario);

        const inventarioNombreCantidad = await historialRepository.createQueryBuilder("historial")
            .select("inventario.nombreStock", "nombre") 
            .addSelect("historial.cantidad", "cantidad") 
            .innerJoin("inventario", "inventario", "historial.id_inventario = inventario.id")
            .where("EXTRACT(MONTH FROM historial.createdAt) = :mes", { mes })
            .andWhere("EXTRACT(YEAR FROM historial.createdAt) = :year", { year })
            .getRawMany();

        return [inventarioNombreCantidad, null];
    } catch (error) {
        console.error("Error al obtener nombre de stock de inventario y cantidad filtrado por mes y año:", error); 
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener nombre de stock inventario, cantidad del historial filtrado por año
export async function getInventarioNombreCantidadYear(year) {
    try {
        const historialRepository = AppDataSource.getRepository(HistorialInventario);

        const inventarioNombreCantidadYear = await historialRepository.createQueryBuilder("historial")
            .select("inventario.nombreStock", "nombre")
            .addSelect("historial.cantidad", "cantidad")
            .innerJoin("inventario", "inventario", "historial.id_inventario = inventario.id")
            .where("EXTRACT(YEAR FROM historial.createdAt) = :year", { year })
            .getRawMany();

        return [inventarioNombreCantidadYear, null];
    } catch (error) {
        console.error("Error al obtener nombre de stock de inventario y cantidad filtrado por año:", error); 
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener nombre de stock inventario, cantidad del historial filtrado por últimos 3 meses sin contar actual
export async function getInventarioNombreCantidadUltimosTresMeses() {
    try {
        const historialRepository = AppDataSource.getRepository(HistorialInventario);
        
        const inventarioNombreCantidadUltimosTresMeses = await historialRepository.createQueryBuilder("historial")
        .select("inventario.nombreStock", "nombre")
        .addSelect("historial.cantidad", "cantidad")
        .addSelect("TO_CHAR(historial.createdAt, 'Month')", "mes")
        .innerJoin("inventario", "inventario", "historial.id_inventario = inventario.id")
        .where("historial.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
        .andWhere("historial.createdAt < DATE_TRUNC('month', NOW())")
        .getRawMany();

    return [inventarioNombreCantidadUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener nombre de stock de inventario y cantidad filtrado por los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener la distribución de productos por proveedor
export async function getDistribucionProductosPorProveedor() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener la distribución de productos por proveedor
        const productosPorProveedor = await inventarioRepository.createQueryBuilder("inventario")
            .select("inventario.nombre_proveedor, COUNT(*) as cantidad")
            .groupBy("inventario.nombre_proveedor")
            .getRawMany();

        return [productosPorProveedor, null];
    } catch (error) {
        console.error("Error al obtener la distribución de productos por proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener productos por proveedor y cantidad filtrado por mes y año
export async function getInventarioProveedorMesYear(mes, year) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);
        
        const inventarioProveedorMesYear = await inventarioRepository.createQueryBuilder("inventario")
        .select("inventario.nombre_proveedor, COUNT(*) as cantidad")
        .where("EXTRACT(MONTH FROM inventario.createdAt) = :mes", { mes })
        .andWhere("EXTRACT(YEAR FROM inventario.createdAt) = :year", { year })
        .groupBy("inventario.nombre_proveedor")
        .getRawMany();
    
        return [inventarioProveedorMesYear, null];
    } catch (error) {
        console.error("Error al obtener el nombre del proveedor y la cantidad por mes y año:", error);
        return [null, "Error interno del servidor"];
    }
} 

// Servicio para obtener productos por proveedor y cantidad filtrado por año
export async function getInventarioProveedorYear(year) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        const inventarioProveedorYear = await inventarioRepository.createQueryBuilder("inventario")
        .select("inventario.nombre_proveedor, COUNT(*) as cantidad")
        .where("EXTRACT(YEAR FROM inventario.createdAt) = :year", { year })
        .groupBy("inventario.nombre_proveedor")
        .getRawMany();

        return [inventarioProveedorYear, null];
    } catch (error) {
        console.error("Error al obtener el nombre del proveedor y la cantidad por año:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener productos por proveedor y cantidad filtrado por los últimos 3 meses sin contar el actual
export async function getInventarioProveedorUltimosTresMeses() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        const inventarioProveedorUltimosTresMeses = await inventarioRepository.createQueryBuilder("inventario")
        .select("inventario.nombre_proveedor, COUNT(*) as cantidad")
        .addSelect("TO_CHAR(inventario.createdAt, 'Month')", "mes")
        .where("inventario.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
        .andWhere("inventario.createdAt < DATE_TRUNC('month', NOW())")
        .groupBy("inventario.nombre_proveedor, TO_CHAR(inventario.createdAt, 'Month')")
        .getRawMany();

        return [inventarioProveedorUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener el nombre del proveedor y la cantidad por los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener productos con bajo stock y restock sugerido, con umbralMinimo
export async function getProductosBajoStockYRestockSugerido() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener productos con bajo stock
        const productosBajoStock = await inventarioRepository.createQueryBuilder("inventario")
        .select(["inventario.nombreStock", "inventario.cantidadStock", "inventario.restockSugerido", "inventario.umbralMinimo"])
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .getMany();

        return [productosBajoStock, null];

    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener productos con bajo stock y restock sugerido filtrado por mes y año
export async function getInventarioBajoStockRestockMesYear(mes, year) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener productos con bajo stock y restock sugerido
        const inventarioBajoStockRestockMesYear = await inventarioRepository.createQueryBuilder("inventario")
        .select(["inventario.nombreStock", "inventario.cantidadStock", "inventario.restockSugerido", "inventario.umbralMinimo"])
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .andWhere("EXTRACT(MONTH FROM inventario.createdAt) = :mes", { mes })
        .andWhere("EXTRACT(YEAR FROM inventario.createdAt) = :year", { year })
        .getMany();

        return [inventarioBajoStockRestockMesYear, null];
    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido por mes y año:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener productos con bajo stock y restock sugerido filtrado por año
export async function getInventarioBajoStockRestockYear(year) {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        // Obtener productos con bajo stock y restock sugerido
        const inventarioBajoStockRestockYear = await inventarioRepository.createQueryBuilder("inventario")
        .select(["inventario.nombreStock", "inventario.cantidadStock", "inventario.restockSugerido", "inventario.umbralMinimo"])
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .andWhere("EXTRACT(YEAR FROM inventario.createdAt) = :year", { year })
        .getMany();

        return [inventarioBajoStockRestockYear, null];
    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido por año:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener productos con bajo stock y restock sugerido filtrado por los últimos 3 meses sin contar el actual
export async function getInventarioBajoStockRestockUltimosTresMeses() {
    try {
        const inventarioRepository = AppDataSource.getRepository(Inventario);

        const inventarioBajoStockRestockUltimosTresMeses = await inventarioRepository.createQueryBuilder("inventario")
        .select(["inventario.nombreStock", "inventario.cantidadStock", "inventario.restockSugerido", "inventario.umbralMinimo"])
        .addSelect("TO_CHAR(inventario.createdAt, 'Month')", "mes")
        .where("inventario.cantidadStock < inventario.umbralMinimo")
        .andWhere("inventario.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
        .andWhere("inventario.createdAt < DATE_TRUNC('month', NOW())")
        .getRawMany();

        return [inventarioBajoStockRestockUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido por los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}