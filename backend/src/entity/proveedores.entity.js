"use strict";
import { EntitySchema } from "typeorm";

// Estructura de los proveedores
const ProveedoresSchema = new EntitySchema({
    name: "Proveedores",
    tableName: "proveedores",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        rut:{
            type: "varchar",
            length: 20,
            nullable: false,
            unique: true,
        },
        nombre: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        email: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        telefono: {
            type: "varchar",
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
            name: "IDX_PROVEEDORES",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_PROVEEDORES_RUT",
            columns: ["rut"],
            unique: true,
        },
    ],
});

export default ProveedoresSchema;