import { deleteInventario } from '@services/inventario.service.js';
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteInventario = (fetchInventario, setDataInventario) => {
    const handleDelete = async (dataInventario) => {
        if (dataInventario.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteInventario(dataInventario[0].id);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El producto ha sido eliminado correctamente.');
                    await fetchInventario();
                    setDataInventario([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el producto.');
            }
        }
    }

    return {
        handleDelete
    };
};

export default useDeleteInventario;