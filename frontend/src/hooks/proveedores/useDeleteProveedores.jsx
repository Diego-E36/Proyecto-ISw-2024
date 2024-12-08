// Imports
import { deleteProveedores } from "@services/proveedores.service.js";
import { deleteDataAlert ,showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

// Hook
const useDeleteProveedores = (fetchProveedores, setDataProveedor) => {
    const handleDelete = async (dataProveedor) => {
        if (dataProveedor.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) { // Si se confirma la eliminación
                    // Eliminar proveedor
                    const response = await deleteProveedores(dataProveedor[0].id)
                    if (response.status === 'Client error') {
                        // Si hay un error, mostrar una alerta
                        return showErrorAlert('Error', response.details);
                    }
                    // Si se elimina correctamente, mostrar una alerta
                    if (response.status === 'Success'){
                        console.log(response)
                        showSuccessAlert('¡Eliminado!', 'El proveedor ha sido eliminado correctamente.');
                        await fetchProveedores();
                        setDataProveedor([]);
                    } else {
                        showErrorAlert('Cancelado', 'El proveedor tiene productos de inventario asociados.');
                    }
                    
                } else { // Si se cancela la eliminación
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                // Si hay un error, mostrar una alerta
                console.error("Error al eliminar el proveedor:", error);
                showErrorAlert("Cancelado", "Ocurrió un error al eliminar el proveedor.");
            }
        }
    }

    // Retornar valores
    return {
        handleDelete
    }
}

export default useDeleteProveedores;