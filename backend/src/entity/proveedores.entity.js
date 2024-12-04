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
        rutProveedor:{
            type: "varchar",
            length: 10,
            nullable: false,
            unique: true,
        },
        nombreProveedor: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        emailProveedor: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        telefonoProveedor: {
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
            columns: ["rutProveedor"],
            unique: true,
        },
    ],
});

export default ProveedoresSchema;