import { useState, useEffect } from "react";
import { getAllNotificaciones } from '@services/notificaciones.service.js'


const useGetNotificacion = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    const fetchNotificaciones = async () => {
        try {
            const response = await getAllNotificaciones();
            if (response.success) {
            const formattedData = response.data.map(notificacion => ({
                id: notificacion.id,
                message: notificacion.message,
                status: notificacion.status,
                notificationType: notificacion.notificationType,
                createdAt: notificacion.createdAt

            }));
            setNotificaciones(formattedData);
            } else {
                throw new Error(response.message || 'Error al cargar las notificaciones');
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
    }, []);



    return { notificaciones, fetchNotificaciones, setNotificaciones };
}

export default useGetNotificacion;