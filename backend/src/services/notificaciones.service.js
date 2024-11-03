"use strict";
import { AppDataSource } from "../config/configDb.js";
import Notificaciones from "../entity/notificaciones.entity.js";
import {
    createMaterialService,
    deleteMaterialService,
    getAllMaterialsService,
    getMaterialByIdService,
    getMaterialsBelowThresholdService,
    updateMaterialService,
} from "../services/materiales.service.js"

export async function createNotificactionService(data, operationType) {
    try {

        const notificationRepository = AppDataSource.getRepository(Notificaciones)

        // Crear el mensaje de notificación

        let message;
        switch (operationType) {
            case "create":
                message = `Se ha creado ${data.name} en la base de datos con ID ${data.materialId}.`;
                break;
            case "update":
                message = `Se ha actualizado ${data.name} en la base de datos con ID ${data.materialId}.`;
                break;
            case "delete":
                message = `Se ha eliminado ${data.name} de la base de datos con ID ${data.materialId}.`;
                break;
            default:
                message = "Operación desconocida";
        }
        // Crear la notificación en la base de datos

        const newNotification = notificationRepository.create({
            message: message,
            status: "unread",
            notificationType: "in-system",
            });

        const Notificationsaved = await notificationRepository.save(newNotification)
        return [Notificationsaved, null];
    } catch (error) {
        console.error("Error al crear notificación:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getUnreadNotificationsService() {
    try{
        const notificationRepository = AppDataSource.getRepository(Notificaciones);

        // Obtener solo los materiales que están por debajo del umbral
        const unreadNotifications = await notificationRepository.createQueryBuilder("notificaciones")
        .where("notificaciones.status = :status", { status: "unread" })
        .getMany();

        if (!unreadNotifications || unreadNotifications.length === 0) return [null , "No hay notificaciones"];

        const notificationData = unreadNotifications.map(({ ...noti }) => noti);

        return [notificationData, null];
    } catch (error) {
        console.error("Error al verificar notificaciones:", error);
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
        const notificationRepository = AppDataSource.getRepository(Notification);

        const notifications = await notificationRepository.find();

        if (!notifications || notifications.length === 0) return [null, "No hay notificaciones registradas"];

        const notificationsData = notifications.map(({ ...noti }) => noti);

        return [notificationsData, null];
    } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function setNotificationPreferencesService() {

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
        const notiDeleted = await materialRepository.remove(notiFound);

        const { ...notiData } = notiDeleted;

        return [notiData, null];
        
    } catch (error) {
        console.error("Error al eliminar notificaciones:", error);
        return [null, "Error interno del servidor"];
    }
}