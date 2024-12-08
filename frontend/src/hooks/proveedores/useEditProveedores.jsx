// Imports
import { useState } from 'react';
import { updateProveedores } from '@services/proveedores.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostProveedores } from '@helpers/formatProveedores.js';

// Hook
const useEditProveedores = (setProveedores) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Abrir o cerrar el popup
    const [dataProveedor, setDataProveedor] = useState([]); // Almacenar los datos del proveedor

    // Al hacer click en el botón de editar
    const handleClickUpdate = () => {
        if (dataProveedor.length > 0) {
            setIsPopupOpen(true);
        }
    }
    
    const handleUpdate = async (updatedProveedorData) => {
        if (updatedProveedorData) {
            try {
                const dataUpdate = { ...updatedProveedorData }; // Copiar los datos actualizados
                const updatedProveedor = await updateProveedores(dataUpdate, dataProveedor[0].id); // Actualizar el proveedor
                // Mostrar una alerta de éxito
                showSuccessAlert('¡Actualizado!', 'El proveedor ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                // Formatear los datos del proveedor
                const formattedProveedor = formatPostProveedores(updatedProveedor);
                // Actualizar los proveedores
                setProveedores(prevProveedores => prevProveedores.map(proveedor =>
                    proveedor.id === formattedProveedor.id ? formattedProveedor : proveedor
                ));
                setDataProveedor([]);
            } catch (error) {
                // Si hay un error, mostrar una alerta
                console.error('Error al actualizar el proveedor:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el proveedor.');
            }
        }
    }
    
    // Retornar valores
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProveedor,
        setDataProveedor
    }
}

export default useEditProveedores;
