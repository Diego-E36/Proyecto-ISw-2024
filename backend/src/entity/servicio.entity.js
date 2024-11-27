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
        id_bicicleta: {
            type: "int",
            nullable: false,
        },
        id_inventorio: {
            type: "int",
            nullable: false,
        },
        id_usuario: {
            type: "int",
            nullable: false,
        },
        tipo:{
            type: "varchar",
            length: 50,
            nullable: false,
        },
        estado: {
            type: "varchar",
            length: 50,
            nullable: false,
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
        createdAt: {
            type: "timestamp with time zone",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
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
            type: "many-to-many",
            joinColumn: {
                name: "id_bicicleta",
                referencedColumnName: "id",
            },
        },
        {
            target: "Inventario",
            type: "many-to-many",
            joinColumn: {
                name: "id_inventorio",
                referencedColumnName: "id",
            },
        }
    ]
})

export default ServicioSchema;