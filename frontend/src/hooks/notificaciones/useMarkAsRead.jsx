import { useState } from "react";
import { markAsRead } from "../../services/notificaciones.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js"

const useMarkAsReadNotificacion = (fetchNotificacion) => {
    const [dataNotificaciones, setDataNotificaciones] = useState([]);


    const handleMarkAsRead = async (notificacionId) => {
        if (notificacionId) {
            try {
                const response = await markAsRead(dataNotificaciones[0].id);
                if (response.error || response.status === "Client error") {
                    showErrorAlert(response.message, response.details);
                } else {
                    showSuccessAlert('¡Actualizado!', 'La notificación esta leida.');
                    await fetchNotificacion();
                    setDataNotificaciones([]);
                }
            } catch (error) {
                console.error("Error:", error);
                showErrorAlert("No se pudo marcar la notificación como leída.");
                return false; // Retorna false en caso de error
            }
        }
    };

    return { 
        handleMarkAsRead,
        dataNotificaciones,
        setDataNotificaciones
    };
};

export default useMarkAsReadNotificacion;