import { useState } from 'react';
import { createServicio } from '@services/servicio.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useCreateServicios = (fetchServicio) => {
    const [servicio, setServicio] = useState({
        id_bicicleta: "",
        id_inventario: "",
        id_usuario: "",
        tipo: "",
        estado: "",
        valor: "",
        descripcion: "",
        duracionMins: "",
    })
    const [isPopupOpenCreate, setIsPopupOpenCreate] = useState(false);

    const createServicios = async (servicio) => {
        try {
            const response = await createServicio(servicio);
            if (response.error) {
                showErrorAlert(response.message);
            } else {
                showSuccessAlert('Servicio creado exitosamente');
                fetchServicio();
                setIsPopupOpenCreate(false)
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const handleCreate = (formData) => {
        createServicios(formData).then();
    }

    return {
        createServicios,
        servicio,
        setServicio,
        isPopupOpenCreate,
        setIsPopupOpenCreate,
        handleCreate,
    }
}

export default useCreateServicios;