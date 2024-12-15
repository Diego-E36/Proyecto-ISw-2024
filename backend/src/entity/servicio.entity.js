"use strict";
import { EntitySchema } from "typeorm";

const ServicioSchema = new EntitySchema({
    name: "Servicio",
    tableName: "servicios",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        bicicleta: {
            type: "varchar",
            nullable: false,
        },
        item: {
            type: "varchar",
            nullable: false,
        },
        rut: {
            type: "varchar",
            nullable: false,
        },
        tipo:{
            type: "varchar",
            length: 50,
            nullable: false,
        },
        estado: {
            type: "enum",
            enum: ["Espera", "Reparación", "Finalizado"],
            default: "Espera",
        },
        valor: {
            type: "int",
            nullable: false,
        },
        descripcion: {
            type: "varchar",
            length: 500,
            nullable: false,
        },
        duracionMins: {
            type: "int",
            nullable: false,
        },
        cantidad: {
            type: "int",
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
            name: "IDX_SERVICIO",
            columns: ["id"],
            unique: true,
        },
    ],
    relations: [
        {
            target: "Bicicleta",
            type: "many-to-one",
            joinColumn: {
                name: "bicicleta",
                referencedColumnName: "numeroSerie",
            },
        },
        {
            target: "Inventario",
            type: "many-to-many",
            joinColumn: {
                name: "item",
                referencedColumnName: "numeroSerie",
            },
        },
        {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "rut",
                referencedColumnName: "rut",
            },
        }
    ]
})

export default ServicioSchema;