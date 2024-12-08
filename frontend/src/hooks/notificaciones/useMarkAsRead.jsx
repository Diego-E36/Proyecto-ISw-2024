import { useState } from "react";
import { markAsRead } from "../../services/notificaciones.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js"

const useMarkAsReadNotificacion = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleMarkAsRead = async (notificacionId) => {
        setIsLoading(true);
        try {
            const response = await markAsRead(notificacionId);
            if (response.success) {
                showSuccessAlert("Notificación marcada como leída.");
                return true; // Retorna true para indicar éxito
            } else {
                throw new Error(response.message || "Error al marcar la notificación como leída.");
            }
        } catch (error) {
            console.error("Error:", error);
            showErrorAlert("No se pudo marcar la notificación como leída.");
            return false; // Retorna false en caso de error
        } finally {
            setIsLoading(false);
        }
    };

    return { handleMarkAsRead, isLoading };
};

export default useMarkAsReadNotificacion;