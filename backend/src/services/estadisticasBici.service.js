"use strict";
import { AppDataSource } from "../config/configDb.js";
import Bicicletas from "../entity/bicicleta.entity.js";


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

//Servicio para obtener bicicletas vendidas
export async function getBicicletasVendidas() {
    try {
        const bicicletaRepository = AppDataSource.getRepository(BicicletaSchema);
        const bicicletasVendidas = await bicicletaRepository.find({
            where: { venta: Not(IsNull()) },
            select: ["id", "numeroSerie", "marca", "modelo", "venta"]
        });
        return [bicicletasVendidas, null];
    } catch (error) {
        console.error("Error al obtener bicicletas vendidas:", error);
        return [null, "Error interno del servidor"];
    }
}