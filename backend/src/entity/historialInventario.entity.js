"use strict";
import { EntitySchema } from "typeorm";

// Estructura del historial de inventario
const HistorialInventarioSchema = new EntitySchema({
    name: "HistorialInventario",
    tableName: "historial_inventario",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        id_inventario: {
            type: "int",
            nullable: true,
        },
        cantidad: {
            type: "int",
            nullable: true,
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: true,
        },
        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: true,
        }
    },
    indices: [
        {
            name: "IDX_HISTORIAL",
            columns: ["id"],
            unique: true,
        }
    ],
    relations: [
        {
            target: "Inventario",
            type: "many-to-one",
            joinColumn: {
                name: "id_inventario",
                referencedColumnName: "id",
            },
        }
    ]
});

export default HistorialInventarioSchema;