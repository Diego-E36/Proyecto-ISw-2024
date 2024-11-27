import axios from './root.service.js';

export async function getAllNotificaciones() {
    try {
        const { data: notificacionesData } = await axios.get('/notificaciones/all');
        return {
            success: true,
            data: notificacionesData.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error al obtener las notificaciones',
            errorDetails: error.response?.data || error.message
        };
    }
}

export async function deleteNotificacion(id) {
    try {
        const { data: notificacionesData } = await axios.delete(`/notificaciones/detail/?id=${id}`);
        return {
            success: true,
            data: notificacionesData.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Error al obtener las notificaciones',
            errorDetails: error.response?.data || error.message
        };
    }
}