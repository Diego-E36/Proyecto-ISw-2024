"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicletas from "../entity/bicicleta.entity.js";
import { IsNull, Not } from "typeorm";

//Servicio para obtener bicicletas por tipo
export async function getBicicletasPorTipo() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorTipo = await bicicletaRepository.createQueryBuilder("bicicleta")
            .select("bicicleta.tipo, COUNT(*) as cantidad")
            .groupBy("bicicleta.tipo")
            .getRawMany();

        return [bicicletasPorTipo, null];
    } catch (error) {
        console.error("Error al obtener la distribución de bicicletas por tipo:", error);
        return [null, "Error interno del servidor"];
    }
}

//Servicio para obtener bicicletas a la venta
export async function getBicicletasVenta() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasVendidas = await bicicletaRepository.find({
            where: { venta: Not(IsNull()) },
            select: ["numeroSerie", "marca", "modelo", "venta"]
        });
        return [bicicletasVendidas, null];
    } catch (error) {
        console.error("Error al obtener bicicletas a la venta:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener bicicletas por Aro 
export async function getBicicletasPorAro() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(Bicicletas);

        const bicicletasPorAro = await bicicletaRepository.find({
            select: ["aro", "modelo"]
        });

        return [bicicletasPorAro, null];
    } catch (error) {
        console.error("Error al obtener las bicicletas con aro:", error);
        return [null, "Error interno del servidor"];
    }
}

// Servicio para obtener bicicletas por tipo filtrado por meses
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