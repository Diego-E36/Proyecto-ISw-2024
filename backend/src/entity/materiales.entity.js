"use strict";
import { EntitySchema } from "typeorm";

const MaterialesSchema = new EntitySchema({
    name: "Materiales",
    tableName: "materiales",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        materialId: {
            type: "varchar",
            length: 50,
            nullable: false,
            unique: true,
        },
        name: {
            type: "varchar",
            nullable: false
        },
        quantity: {
            type: "int",
            nullable: false,
            default: 0
        },
        minQuantity: {
            type: "int",
            nullable: false,
            default: 1
        },
        supplier: {
            type: "varchar",
            nullable: true
        },
        suggestedRestock: {
            type: "int",
            nullable: false,
            default: 10
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
        lastUpdated: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
        },
    },
    indices: [
        {
            name: "IDX_MATERIALES",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_MATERIALES_MATERIALID",
            columns: ["materialId"],
            unique: true,
        },
    ],
});

export default MaterialesSchema;
