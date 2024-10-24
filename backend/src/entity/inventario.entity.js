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
        colorUnidad: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        precioUnidad: {
            type: "int",
            nullable: false,
        },
        marcaUnidad: {
            type: "varchar",
            length: 50,
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