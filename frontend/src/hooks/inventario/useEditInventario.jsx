import {useState} from 'react';
import {updateInventario} from '@services/inventario.service.js';
import {showErrorAlert, showSuccessAlert} from '@helpers/sweetAlert.js';
import { formatPostInventario } from '@helpers/formatInventario.js';

const useEditInventario = (setInventario) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataInventario, setDataInventario] = useState([]);

    const handleClickUpdate = () => {
        if (dataInventario.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedInventarioData) => {
        if (updatedInventarioData) {
            try {
                const updatedInventario = await updateInventario(updatedInventarioData, dataInventario[0].numeroSerie);
                showSuccessAlert('¡Actualizado!','El producto ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedInventario = formatPostInventario(updatedInventario);

                setInventario(prevInventario => prevInventario.map(inventario => {
                    console.log("Producto actual:", inventario);
                    if (inventario.id === formattedInventario.id) {
                        console.log("Reemplazando con:", formattedInventario);
                    }
                    return inventario.numeroSerie === formattedInventario.numeroSerie ? formattedInventario : inventario;
                }));

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