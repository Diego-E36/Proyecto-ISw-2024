// Imports
import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";
import { format as formatRut } from "rut.js";

// Funciones
export function formatProveedoresData(proveedor){
    return {
        ...proveedor,
        rut: formatRut(proveedor.rut),
        nombre: startCase(proveedor.nombre),
        email: proveedor.email,
        telefono: proveedor.telefono,
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(proveedor.updatedAt, "DD-MM-YYYY HH:mm"),
    }
}

export function formatPostProveedores(proveedor){
    return {
        rut: formatRut(proveedor.rut),
        nombre: startCase(proveedor.nombre),
        email: proveedor.email,
        telefono: proveedor.telefono,
        createdAt: formatTempo(proveedor.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(proveedor.updatedAt, "DD-MM-YYYY HH:mm"),
    }
}