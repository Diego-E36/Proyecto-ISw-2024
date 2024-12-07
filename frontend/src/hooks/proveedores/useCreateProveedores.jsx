// Imports
import { useState } from 'react';
import { createProveedores } from '@services/proveedores.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

// Hook
const useCreateProveedores = (fetchProveedores) => {
    const [proveedor, setProveedor] = useState({
        rut: "",
        nombre: "",
        email: "",
        telefono: "",
    })
    const [isPopupOpenCreate, setIsPopupOpenCreate] = useState(false); //?

    // Crear proveedor
    const createProveedor = async (proveedor) => {
        try {
            const response = await createProveedores(proveedor);
            if (response.error) {
                showErrorAlert(response.message);
            } else {
                showSuccessAlert('Proveedor creado exitosamente');
                fetchProveedores();
                setIsPopupOpenCreate(false);
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // Pasar los datos recibidos desde el formulario
    const handleCreate = (formData) => {
        createProveedor(formData).then();
    }

    // Retornar valores
    return {
        createProveedor,
        proveedor,
        setProveedor,
        isPopupOpenCreate,
        setIsPopupOpenCreate,
        handleCreate
    }
}

export default useCreateProveedores;