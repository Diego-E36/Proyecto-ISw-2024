"use strict";
import {
    deleteNotificationService,
    getAllNotificationsService, 
    markAsReadService
} from "../services/notificaciones.service.js";

import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";


export async function deleteNotification(req, res) {
    try {
        const { id } = req.params;
        
        const [notiDelete, errorNoti] = await deleteNotificationService({ id });

        if (errorNoti) return handleErrorClient(res, 404, "Error eliminando notificación", errorNoti);
        
        handleSuccess(res, 200, "Notificación eliminada correctamente", notiDelete);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllNotifications(req, res) {
    try {
        const [notificacion, errorNoti] = await getAllNotificationsService();

        if (errorNoti) return handleErrorClient(res, 404, errorNoti);

        notificacion.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Notificaciones encontrada", notificacion);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function markAsRead(req, res) {
    try{
        const { id } = req.params;
        
        const [notificacion, errorNoti] = await markAsReadService({ id });
        
        if (errorNoti) return handleErrorClient(res, 404, "Error", errorNoti);

        handleSuccess(res, 200, "Notificación leída", notificacion);
    } catch (error){
        handleErrorServer(res, 500, error.message);
    }
    
}


