"use strict";
import { AppDataSource } from "../config/configDb.js";
import Notificaciones from "../entity/notificaciones.entity.js";

export async function createNotificactionService(data, operationType, stock) {
    try {
        const notificationRepository = AppDataSource.getRepository(Notificaciones);
        
        let message;
        switch (operationType) {
            case "create":
                message = `Se ha creado ${data.nombreStock} en la base de datos con Numero de serie ${data.numeroSerie}.`;
                if (data.cantidadStock <= data.umbralMinimo) {
                    await createNotificactionService(data, "below", 0);
                }
                break;
            case "createServicio":
                message = `Se ha creado un servicio de ${data.tipo} en la base de datos con la bicicleta ${data.bicicleta}`
                break;
            case "createBicicleta":
                message = `Se ha ingresado una bicicleta en la base de datos con Numero de serie ${data.numeroSerie}`
                break;
            case "updateServicio":
                message = `Se ha actualizado el servicio de ${data.tipo} en la base de datos`
                break;
            case "updateBicicleta":
                message = `Se ha actualizado una bicicleta en la base de datos con Numero de serie ${data.numeroSerie}`
                break;
            case "update":
                message = `Se ha actualizado ${data.nombreStock} en la base de datos con Numero de serie ${data.numeroSerie}.`;
                if (data.cantidadStock <= data.umbralMinimo) {
                    await createNotificactionService(data, "below", 0);
                }
                break;
            case "updateStock":
                message = `Se han restado ${stock} unidades de ${data.nombreStock} en la base de datos`
                if (data.cantidadStock <= data.umbralMinimo) {
                    await createNotificactionService(data, "below", 0);
                }
                break; 
            case "delete":
                message = `Se ha eliminado ${data.nombreStock} de la base de datos con Numero de serie ${data.numeroSerie}.`;
                break;
            case "below":
                message = `${data.nombreStock} está bajo umbral de inventario con ${data.cantidadStock} unidades`;
                break;
            default:
                message = "Operación desconocida";
        }

        const newNotification = notificationRepository.create({
            message: message,
            status: "unread",
            notificationType: "in-system",
        });

        const notificationSaved = await notificationRepository.save(newNotification);
        return [notificationSaved, null];
    } catch (error) {
        console.error("Error al crear notificación:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function markAsReadService(query) {
    try {

        const { id } = query;

        const notificationRepository = AppDataSource.getRepository(Notificaciones);

        // Verificar si la notificación existe
        const notification = await notificationRepository.findOneBy({ id: id });
        if (!notification) {
            throw new Error(`La notificación con ID ${query.id} no existe.`);
        }

        if (notification.status == "read") return [ null, "La notificación ya esta leida"]
        // Marcar la notificación como leída
        notification.status = "read";
        // Guardar la notificación actualizada en la base de datos
        const updatedNotification = await notificationRepository.save(notification);

        // Devolver la notificación actualizada
        return [updatedNotification, null];
    } catch (error) {
        console.error("Error al marcar notificación como leída:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getAllNotificationsService() {
    try {
        const notificationRepository = AppDataSource.getRepository(Notificaciones);

        const notifications = await notificationRepository.find();

        if (!notifications || notifications.length === 0) return [null, "No hay notificaciones registradas"];

        const notificationsData = notifications.map(({ ...noti }) => noti);

        return [notificationsData, null];
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteNotificationService(query) {
    try {
        const { id } = query;
        
        const notificationRepository = AppDataSource.getRepository(Notificaciones);

        // Verificar si el material existe
        const notiFound = await notificationRepository.findOne({ 
            where: [{ id: id }],
        });

        if (!notiFound) return [null, "notificaciones no encontradas"];

        // Eliminar el material encontrado
        const notiDeleted = await notificationRepository.remove(notiFound);

        const { ...notiData } = notiDeleted;

        return [notiData, null];
        
    } catch (error) {
        console.error("Error al eliminar notificaciones:", error);
        return [null, "Error interno del servidor"];
    }
}