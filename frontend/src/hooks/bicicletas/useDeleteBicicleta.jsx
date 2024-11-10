import { deleteBicicletas } from "@services/bicicletas.service.js";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useDeleteBicicleta = (fetchBicicletas, setDataBicicleta) => {
    const handleDelete = async (dataBicicleta) => {
        if(dataBicicleta.length > 0){
            try{
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                    const response = await deleteBicicletas(dataBicicleta[0].id);
                    if(response.status === 'Client error'){
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La bicicleta ha sido eliminada correctamente.');
                    await fetchBicicletas();
                    setDataBicicleta([]);
                }else{
                    showErrorAlert('Cancelado','La operación ha sido cancelada.');
                }
            }catch(error){
                console.error('Error al eliminar la bicicleta:', error);
                showErrorAlert('Cancelado','Ocurrió un error al eliminar la bicicleta.');
            }
        }
    };
    return{
        handleDelete
    };
};

export default useDeleteBicicleta;