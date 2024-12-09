import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";

// Funciones
export function formatServicioData(servicio){
    return {
        ...servicio,
            id: servicio.id,
            id_bicicleta: servicio.id_bicicleta,
            id_inventario: servicio.id_inventario,
            id_usuario: servicio.id_usuario,
            tipo: servicio.tipo,
            estado: startCase(servicio.estado),
            valor: servicio.valor,
            descripcion: servicio.descripcion,
            duracionMins: servicio.duracionMins,
            createdAt: formatTempo(servicio.createdAt, "DD-MM-YYYY"),
            updatedAt: formatTempo(servicio.updatedAt, "DD-MM-YYYY HH:mm"),
    }
}

export function formatPostServicio(servicio){
    return {
            id_bicicleta: servicio.id_bicicleta,
            id_inventario: servicio.id_inventario,
            id_usuario: servicio.id_usuario,
            tipo: servicio.tipo,
            estado: startCase(servicio.estado),
            valor: servicio.valor,
            descripcion: servicio.descripcion,
            duracionMins: servicio.duracionMins,
            createdAt: formatTempo(servicio.createdAt, "DD-MM-YYYY"),
            updatedAt: formatTempo(servicio.updatedAt, "DD-MM-YYYY HH:mm"),

    }
}