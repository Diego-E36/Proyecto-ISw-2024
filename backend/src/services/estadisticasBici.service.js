"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicletas from "../entity/bicicleta.entity.js";
import { IsNull, Not } from "typeorm";

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

// Servicio para obtener bicicletas por Aro filtrado por meses
export async function getBicicletasPorAroMes(mes) {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAro = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("bicicleta.aro, bicicleta.modelo")
            .where("EXTRACT(MONTH FROM bicicleta.createdAt) = :mes", { mes })
            .groupBy("bicicleta.aro, bicicleta.modelo")
            .getRawMany();

        return [bicicletasPorAro, null];
    } catch (error) {
        console.error("Error al obtener las bicicletas con aro y mes:", error);
        return [null, "Error interno del servidor"];
    }
}