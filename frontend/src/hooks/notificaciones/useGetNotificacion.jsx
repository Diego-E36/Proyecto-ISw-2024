import { useState, useEffect } from "react";
import { getAllNotificaciones } from '@services/notificaciones.service.js';
import { format as formatTempo } from "@formkit/tempo";

const useGetNotificacion = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    const fetchNotificaciones = async () => {

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
        
        try {
            const response = await getAllNotificaciones();
            const formattedData = response.map(notificacion => ({
                id: notificacion.id,
                message: notificacion.message,
                status: translateStatus(notificacion.status),
                notificationType: notificacion.notificationType,
                createdAt: formatTempo(notificacion.createdAt, "DD-MM-YYYY HH:mm")
            }));
            setNotificaciones(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchNotificaciones();
    }, []);

    // Filtra y cuenta las no leídas
    const unreadCount = notificaciones.filter(n => n.status === "No leído").length;

    return { notificaciones, fetchNotificaciones, setNotificaciones, unreadCount };
}

export default useGetNotificacion;