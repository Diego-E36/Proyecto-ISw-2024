import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";
import { format as formatRut } from "rut.js";

// Funciones
export function formatServicioData(servicio){
    return {
        ...servicio,
            id: servicio.id,
            bicicleta: servicio.bicicleta,
            item: servicio.item,
            rut: formatRut(servicio.rut),
            tipo: servicio.tipo,
            estado: startCase(servicio.estado),
            valor: servicio.valor,
            descripcion: servicio.descripcion,
            duracionMins: servicio.duracionMins,
            cantidad: servicio.cantidad,
            createdAt: formatTempo(servicio.createdAt, "DD-MM-YYYY"),
            updatedAt: formatTempo(servicio.updatedAt, "DD-MM-YYYY HH:mm"),
    }
}

export function formatPostServicio(servicio){
    return {
            bicicleta: servicio.bicicleta,
            item: servicio.item,
            rut: formatRut(servicio.rut),
            tipo: servicio.tipo,
            estado: startCase(servicio.estado),
            valor: servicio.valor,
            descripcion: servicio.descripcion,
            duracionMins: servicio.duracionMins,
            cantidad: servicio.cantidad,
            createdAt: formatTempo(servicio.createdAt, "DD-MM-YYYY"),
            updatedAt: formatTempo(servicio.updatedAt, "DD-MM-YYYY HH:mm"),

    }
}