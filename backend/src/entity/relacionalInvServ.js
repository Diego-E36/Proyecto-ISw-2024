"use strict";

import { EntitySchema } from "typeorm";

// Estructura de la relación entre inventario y servicios
const RelacionalInvServSchema = new EntitySchema({
    name: "RelacionalInvServ",
    tableName: "relacional_inv_serv",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        idServicio: {
            type: "int",
            nullable: false,
        },
        numSerie: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        cantidad: {
            type: "int",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_RELACIONAL_INV_SERV",
            columns: ["id"],
            unique: true,
        },
    ],
    relations: [
        {
            target: "Inventario",
            type: "many-to-one",
            joinColumn: {
                name: "numSerie",
                referencedColumnName: "numeroSerie",
            },
        },
        {
            target: "Servicio",
            type: "many-to-one",
            joinColumn: {
                name: "idServicio",
                referencedColumnName: "id",
            },
        },
    ],
});

export default RelacionalInvServSchema;