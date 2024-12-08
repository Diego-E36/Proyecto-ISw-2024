"use strict";
import { EntitySchema } from "typeorm";

// Estructura del inventario
const InventarioSchema = new EntitySchema({
    name: "Inventario",
    tableName: "inventario",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        numeroSerie: {
            type: "varchar",
            length: 50,
            nullable: false,
            unique: true,
        },
        nombreStock: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        cantidadStock: {
            type: "int",
            nullable: false,
        },
        descripcionUnidad: {
            type: "varchar",
            length: 100,
            nullable: false,
        },
        precioUnidad: {
            type: "int",
            nullable: false,
            default: 0
        },
        marcaUnidad: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        id_proveedor: {
            type: "int",
            nullable: false,
        },
        restockSugerido: {
            type: "int",
            nullable: false,
        },
        umbralMinimo:{
            type: "int",
            nullable: false,
        },
        boolMateriales: {
            type: "boolean",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_INVENTARIO",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_INVENTARIO_NUMEROSERIE",
            columns: ["numeroSerie"],
            unique: true,
        },
    ],
});

export default InventarioSchema;