import { useState, useEffect } from "react";
import { getUnreadNotificaciones } from '@services/notificaciones.service.js';

const useGetUnreadNotificacion = () => {
    const [unreadnotificaciones, setUnreadNotificaciones] = useState([]);

    const fetchUnreadNotificaciones = async () => {
        try {
            const response = await getUnreadNotificaciones();
            if (response.success) {
            const formattedData = response.data.map(notificacion => ({
                id: notificacion.id,
                message: notificacion.message,
                status: notificacion.status,
                notificationType: notificacion.notificationType,
                createdAt: notificacion.createdAt
                
            }));
            console.log("aaaaaa");
            setUnreadNotificaciones(formattedData);
            } else {
                throw new Error(response.message || 'Error al cargar las notificaciones');
            }

        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUnreadNotificaciones();
    }, []);

 

    return { unreadnotificaciones, fetchUnreadNotificaciones, setUnreadNotificaciones };
}

export default useGetUnreadNotificacion;