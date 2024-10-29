"use strict";
//Modelar la tabla de estadisticas
import { EntitySchema } from "typeorm";

const EstadisticasSchema = new EntitySchema({
    name: "Estadisticas",
    tableName: "estadisticas",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        operadorId: {
            type: "int",
            nullable: false
        },
        fecha: {
            type: "date",
            nullable: false,
        },
        actividad: {
            type: "varchar",
            length: 255,
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
    relations: {
        operador: {
            //varias estadisticas pueden pertenecer a un operador
            type: "many-to-one",
            target: "User",
            joinColumn: { name: "operadorId" },  //define la columna que une ambas tablas (foreign key)
            cascade: true,
            onDelete: "CASCADE", //si el usuario es borrado, las estadisticas también se borrarán
        },
    },
});

export default EstadisticasSchema;