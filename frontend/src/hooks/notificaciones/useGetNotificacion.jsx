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
            if (response.success) {
            const formattedData = response.data.map(notificacion => ({
                id: notificacion.id,
                message: notificacion.message,
                status: translateStatus(notificacion.status),
                notificationType: notificacion.notificationType,
                createdAt: formatTempo(notificacion.createdAt, "DD-MM-YYYY HH:mm")

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