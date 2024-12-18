import { useState, useEffect } from "react";
import { getAllNotificaciones } from '@services/notificaciones.service.js';
import { format as formatTempo } from "@formkit/tempo";

const useGetNotificacion = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0); // Estado para el conteo de no leídas


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

     // Método para actualizar el conteo manualmente
    const updateUnreadCount = () => {
        const UnreadCount = notificaciones.filter(n => n.status === 'No leído').length;
        setUnreadCount(UnreadCount);
    };


    useEffect(() => {
        fetchNotificaciones();
    }, []);

    

    return { 
        notificaciones, 
        fetchNotificaciones, 
        setNotificaciones,
        unreadCount, 
        setUnreadCount,  
        updateUnreadCount  
    };
}

export default useGetNotificacion;