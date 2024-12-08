import { useState, useEffect } from "react";
import { getUnreadNotificaciones } from '@services/notificaciones.service.js';
import { format as formatTempo } from "@formkit/tempo";

const useGetUnreadNotificacion = () => {
    const [unreadNotificaciones, setUnreadNotificaciones] = useState([]);
    const fetchUnreadNotificaciones = async () => {
        try {

            const translateStatus = (status) => {
                switch (status) {
                    case 'unread':
                        return 'No leído';
                    case 'read':
                        return 'Leído';
                    default:
                        return status;
                }
            };
            const response = await getUnreadNotificaciones();
            if (response.success) {
                const formattedData = response.data.map(notificacion => ({
                    id: notificacion.id,
                    message: notificacion.message,
                    status: translateStatus(notificacion.status),
                    notificationType: notificacion.notificationType,
                    createdAt: formatTempo(notificacion.createdAt, "DD-MM-YYYY HH:mm")
    
                }));
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

    return { unreadNotificaciones, fetchUnreadNotificaciones, setUnreadNotificaciones };
}

export default useGetUnreadNotificacion;