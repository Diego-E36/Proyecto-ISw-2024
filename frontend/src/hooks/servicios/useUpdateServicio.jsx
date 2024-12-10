import { useState } from 'react';
import { updateServicio } from '@services/servicio.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostServicio } from '@helpers/formatServicio.js';

const useEditServicios = (setServicios) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataServicio, setDataServicio] = useState([]);

    const handleClickUpdate = () => {
        if (dataServicio.length > 0) {
            setIsPopupOpen(true);
        }
    }

    const handleUpdate = async (updatedServicioData) => {
        if (updatedServicioData) {
            try {
                const dataUpdate = { ...updatedServicioData }; // Copiar los datos actualizados
                const updatedServicio = await updateServicio(dataUpdate, dataServicio[0].id); // Actualizar el servicio
                // Mostrar una alerta de éxito
                if (updatedServicio.error || updatedServicio.status === "Client error") {
                    showErrorAlert(updatedServicio.message, updatedServicio.details)
                } else {
                showSuccessAlert('¡Actualizado!', 'El servicio ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                // Formatear los datos del servicio
                const formattedServicio = formatPostServicio(updatedServicio);
                // Actualizar los servicios
                setServicios(prevServicios => prevServicios.map(servicio =>
                    servicio.id === formattedServicio .id ? formattedServicio : servicio 
                ));
                setDataServicio([]);
                }
            } catch (error) {
                // Si hay un error, mostrar una alerta
                console.error('Error al actualizar el servicio:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el servicio.');
            }
        }
    }

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataServicio,
        setDataServicio
    }
}

export default useEditServicios;