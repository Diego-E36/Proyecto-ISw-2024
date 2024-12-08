import {useState} from 'react';
import { updateInventario } from '@services/inventario.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostInventario } from '@helpers/formatInventario.js';

const useEditInventario = (setInventario) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataInventario, setDataInventario] = useState([]);

    // Al hacer click en el botón de editar
    const handleClickUpdate = () => {
        if (dataInventario.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedInventarioData) => {
        if (updatedInventarioData) {
            try {
                const dataUpdate = { ...updatedInventarioData };
                const updatedInventario = await updateInventario(dataUpdate, dataInventario[0].id);
                showSuccessAlert('¡Actualizado!','El producto ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedInventario = formatPostInventario(updatedInventario);
                setInventario(prevInventario => prevInventario.map(inventario =>
                    inventario.id === formattedInventario.id ? formattedInventario : inventario
                ))
                setDataInventario([]);
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el producto.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataInventario,
        setDataInventario
    };
};

export default useEditInventario;