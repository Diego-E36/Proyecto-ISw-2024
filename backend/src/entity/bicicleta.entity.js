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
        marca: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        modelo: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        color: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        tipo: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        aro: {
            type: "int",
            nullable: false,
        },
        createdAt: {
            type: "timestamp with time zone",
            nullable: false,
        },
        updatedAt: {
            type: "timestamp with time zone",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        }
    }
});

export default BicicletaSchema;