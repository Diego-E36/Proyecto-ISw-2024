// Imports
import { useState } from 'react';
import { createInventario } from '@services/inventario.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

// Hook
const useCreateInventario = (fetchInventario) => {
    const [inventario, setInventario] = useState({
        numeroSerie: "",
        nombreStock: "",
        cantidadStock: "",
        descripcionUnidad: "",
        precioUnidad: "",
        marcaUnidad: "",
        id_proveedor: "",
        restockSugerido: "",
        umbralMinimo: "",
        boolMateriales: "",
    })
    const [isPopupOpenCreate, setIsPopupOpenCreate] = useState(false); //?

    // Crear inventario
    const createInventarioFuncion = async (inventario) => {
        try {
            const response = await createInventario(inventario);
            if (response.error) {
                showErrorAlert(response.message);
            } else {
                showSuccessAlert('Inventario creado exitosamente');
                fetchInventario();
                setIsPopupOpenCreate(false);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // Pasar los datos recibidos desde el formulario
    const handleCreate = (formData) => {
        createInventarioFuncion(formData).then();
    }

    // Retornar valores
    return {
        createInventarioFuncion,
        inventario,
        setInventario,
        isPopupOpenCreate,
        setIsPopupOpenCreate,
        handleCreate
    }
}

export default useCreateInventario;