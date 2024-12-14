"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicletas from "../entity/bicicleta.entity.js";


//Servicio para obtener todas las bicicletas por tipo
export async function getAllBicicletasTipo() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const allBicicletasTipo = await bicicletaRepository.createQueryBuilder("bicicleta")
        .select("bicicleta.tipo, COUNT(*) as cantidad")	
        .groupBy("bicicleta.tipo")
        .getRawMany();
        return [allBicicletasTipo, null];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas por tipo filtrado por meses
export async function getBicicletasPorTipoMes(mes) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorTipo = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("bicicleta.tipo, COUNT(*) as cantidad")
            .where("EXTRACT(MONTH FROM bicicleta.createdAt) = :mes", { mes })
            .groupBy("bicicleta.tipo")
            .getRawMany();

        return [bicicletasPorTipo, null];
    } catch (error) {
        console.error("Error al obtener bicicletas por tipo y mes:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener bicicletas por tipo filtrado por año
export async function getBicicletasPorTipoAño(year) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorTipoAño = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("bicicleta.tipo, COUNT(*) as cantidad")
            .where("EXTRACT(YEAR FROM bicicleta.createdAt) = :year", { year })
            .groupBy("bicicleta.tipo")
            .getRawMany();

        return [bicicletasPorTipoAño, null];
    } catch (error) {
        console.error("Error al obtener bicicletas por tipo y año:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas por tipo filtrado por los últimos 3 meses sin contar acual
export async function getBicicletasPorTipoUltimosTresMeses() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorTipoUltimosTresMeses = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("bicicleta.tipo, COUNT(*) as cantidad")
            .where("bicicleta.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
            .andWhere("bicicleta.createdAt < DATE_TRUNC('month', NOW())")
            .groupBy("bicicleta.tipo")
            .getRawMany();
            console.log("Resultados de la consulta:", bicicletasPorTipoUltimosTresMeses);

        return [bicicletasPorTipoUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener bicicletas por tipo en los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener todas las bicicletas a la venta por modelo
export async function getAllBicicletasVenta() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasVenta = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select(["bicicleta.modelo", "bicicleta.venta"])
            .where("bicicleta.venta > 0")
            .getRawMany();

        return [bicicletasVenta, null];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas a la venta:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas a la venta filtrado por meses
export async function getBicicletasVentaMes(mes) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasVendidasMes = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select(["bicicleta.modelo", "bicicleta.venta"])
            .where("EXTRACT(MONTH FROM bicicleta.createdAt) = :mes ", { mes })
            .andWhere("bicicleta.venta IS NOT NULL")
            .andWhere("bicicleta.venta > 0")
            .getMany();
        
        return [bicicletasVendidasMes, null];
    } catch (error) {
        console.error("Error al obtener bicicletas a la venta por mes:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas a la venta filtrado por año
export async function getBicicletasVentaYear(year) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasVentaYear = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select(["bicicleta.modelo", "bicicleta.venta"])
            .where("EXTRACT(YEAR FROM bicicleta.createdAt) = :year ", { year })
            .andWhere("bicicleta.venta IS NOT NULL")
            .andWhere("bicicleta.venta > 0")
            .getMany();

        return [bicicletasVentaYear, null];
    } catch (error) {
        console.error("Error al obtener bicicletas a la venta por año:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas a la venta filtrado por los últimos 3 meses sin contar acual
export async function getBicicletasVentaUltimosTresMeses() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasVentaUltimosTresMeses = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select(["bicicleta.modelo", "bicicleta.venta"])
            .where("bicicleta.venta > 0")
            .andWhere("bicicleta.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
            .andWhere("bicicleta.createdAt < DATE_TRUNC('month', NOW())")
            .getMany();

        return [bicicletasVentaUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener bicicletas a la venta en los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener todas las bicicletas por aro
export async function getAllBicicletasPorAro() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAro = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("CAST(bicicleta.aro AS VARCHAR) AS aro, COUNT(*) as cantidad")
            .groupBy("bicicleta.aro")
            .getRawMany();

        return [bicicletasPorAro, null];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas por aro:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas por Aro filtrado por meses
export async function getBicicletasPorAroMes(mes) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAro = await bicicletaRepository.createQueryBuilder("bicicleta")
        .select("CAST(bicicleta.aro AS VARCHAR) AS aro, COUNT(*) as cantidad")
            .where("EXTRACT(MONTH FROM bicicleta.createdAt) = :mes", { mes })
            .groupBy("bicicleta.aro")
            .getRawMany();

        return [bicicletasPorAro, null];
    } catch (error) {
        console.error("Error al obtener las bicicletas con aro y mes:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas por aro filtrado por año
export async function getBicicletasPorAroYear(year) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAroYear = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("CAST(bicicleta.aro AS VARCHAR) AS aro, COUNT(*) as cantidad")
            .where("EXTRACT(YEAR FROM bicicleta.createdAt) = :year", { year })
            .groupBy("bicicleta.aro")
            .getRawMany();

        return [bicicletasPorAroYear, null];
    } catch (error) {
        console.error("Error al obtener bicicletas por aro y año:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas por aro filtrado por los últimos 3 meses sin contar acual
export async function getBicicletasPorAroUltimosTresMeses() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAroUltimosTresMeses = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("CAST(bicicleta.aro AS VARCHAR) AS aro, COUNT(*) as cantidad")
            .where("bicicleta.createdAt >= DATE_TRUNC('month', NOW()) - INTERVAL '3 months'")
            .andWhere("bicicleta.createdAt < DATE_TRUNC('month', NOW())")
            .groupBy("bicicleta.aro")
            .getRawMany();

        return [bicicletasPorAroUltimosTresMeses, null];
    } catch (error) {
        console.error("Error al obtener bicicletas por aro en los últimos 3 meses:", error);
        return [null, "Error interno del servidor"];
    }
}