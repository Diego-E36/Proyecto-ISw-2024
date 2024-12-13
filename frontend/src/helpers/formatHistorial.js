import { format as formatTempo } from "@formkit/tempo";

export function formatHistorialData(historial) {
    return {
        ...historial,
        id_inventario: historial.id_inventario,
        id_usuario: historial.id_usuario,
        cantidad: historial.cantidad,
        createdAt: formatTempo(inventario.createdAt, "DD-MM-YYYY HH:mm"),
        updatedAt: formatTempo(inventario.updatedAt, "DD-MM-YYYY HH:mm"),
    };
}