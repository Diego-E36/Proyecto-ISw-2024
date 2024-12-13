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