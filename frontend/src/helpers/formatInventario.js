import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";
import { formatPostUpdate } from "./formatData";

export function formatInventarioData(inventario) {
    return {
        ...inventario,
        numeroSerie: inventario.numeroSerie,
        nombreStock: startCase(inventario.nombreStock),
        colorUnidad: startCase(inventario.colorUnidad),
        precioUnidad: inventario.precioUnidad,
        marcaUnidad: startCase(inventario.marcaUnidad),
        createdAt: formatTempo(inventario.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(inventario.updatedAt, "DD-MM-YYYY"),
    };
}

export function formatPostInventario(inventario) {
    return {
        numeroSerie: inventario.numeroSerie,
        nombreStock: startCase(inventario.nombreStock),
        colorUnidad: startCase(inventario.colorUnidad),
        precioUnidad: inventario.precioUnidad,
        marcaUnidad: startCase(inventario.marcaUnidad),
        createdAt: formatTempo(inventario.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(inventario.updatedAt, "DD-MM-YYYY"),
    };
}

