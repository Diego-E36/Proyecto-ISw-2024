"use strict";
import { EntitySchema } from "typeorm";

const notificationesSchema = new EntitySchema({
    name: "Notification",
    tableName: "notifications",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        message: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        status: {
            type: "enum",
            enum: ["unread", "read"],
            default: "unread",
        },
        notificationType: {
            type: "enum",
            enum: ["email", "sms", "in-system"],
            default: "in-system",
            comment: "Método de notificación (correo, SMS o dentro del sistema)",
        },
        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },      
    }, 
});

export default notificationesSchema;