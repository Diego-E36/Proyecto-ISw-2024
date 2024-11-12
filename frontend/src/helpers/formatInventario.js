import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";
import { formatPostUpdate } from "./formatData";
import { useMemo } from "react";

export function formatInventarioData(inventario) {
    return {
        ...inventario,
        numeroSerie: inventario.numeroSerie,
        nombreStock: startCase(inventario.nombreStock),
        descripcionUnidad: startCase(inventario.descripcionUnidad),
        precioUnidad: inventario.precioUnidad !== null ? `$${inventario.precioUnidad.toLocaleString('es-ES')}` : "No está a la venta",
        marcaUnidad: startCase(inventario.marcaUnidad),
        proveedor: startCase(inventario.proveedor),
        restockSugerido: inventario.restockSugerido,
        umbralMinimo: inventario.umbralMinimo,
        boolMateriales: startCase(inventario.boolMateriales),
        createdAt: formatTempo(inventario.createdAt, "DD-MM-YYYY HH:mm"),
        updatedAt: formatTempo(inventario.updatedAt, "DD-MM-YYYY HH:mm"),
    };
}

export function formatPostInventario(inventario) {
    return {
        numeroSerie: inventario.numeroSerie,
        nombreStock: startCase(inventario.nombreStock),
        descripcionUnidad: startCase(inventario.descripcionUnidad),
        precioUnidad: inventario.precioUnidad !== null ? `$${inventario.precioUnidad.toLocaleString('es-ES')}` : "No está a la venta",
        marcaUnidad: startCase(inventario.marcaUnidad),
        proveedor: startCase(inventario.proveedor),
        restockSugerido: inventario.restockSugerido,
        umbralMinimo: inventario.umbralMinimo,
        boolMateriales: inventario.boolMateriales,
        createdAt: formatTempo(inventario.createdAt, "DD-MM-YYYY HH:mm"),
        updatedAt: formatTempo(inventario.updatedAt, "DD-MM-YYYY HH:mm"),
    };
}

