import axios from './root.service.js';

export async function getAllNotificaciones() {
    try {
        const { data: notificacionesData } = await axios.get('/notificaciones/all');
        return notificacionesData.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteNotificacion(id) {
    try {
        const response = await axios.delete(`/notificaciones/${id}`);
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export async function markAsRead(id) {
    try {
        const response = await axios.patch(`/notificaciones/${id}`);
        return response.data
    } catch (error) {
        return error.response.data;      
    }
}