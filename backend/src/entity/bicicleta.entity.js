"use strict";
import { EntitySchema } from "typeorm";

const BicicletaSchema = new EntitySchema({
    name: "Bicicleta",
    tableName: "bicicletas",
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
        marca: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        modelo: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        color: {
            type: "varchar",
            length: 20,
            nullable: false,
        },
        tipo: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
        aro: {
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
        }
    },
    indices: [
        {
            name: "IDX_BICICLETA",
            columns: ["id"],
            unique: true,
        },
        {
            name: "IDX_BICICLETA_NUMEROSERIE",
            columns: ["numeroSerie"],
            unique: true,
        }
    ]
});

export default BicicletaSchema;