import { deleteNotificacion } from "@services/notificaciones.service.js";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";

const useDeleteNotificacion = (fetchNotificacion, setDataNotificacion) => {
    const handleDelete = async (dataNotificacion) => {
        if(dataNotificacion.length > 0){
            try{
                const result = await deleteDataAlert();
                if(result.isConfirmed){
                    const response = await deleteNotificacion(dataNotificacion[0].id);
                    if(response.status === 'Client error'){
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La Notificación ha sido eliminada correctamente.');
                    await fetchNotificacion();
                    setDataNotificacion([]);
                }else{
                    showErrorAlert('Cancelado','La operación ha sido cancelada.');
                }
            }catch(error){
                console.error('Error al eliminar la notificación:', error);
                showErrorAlert('Cancelado','Ocurrió un error al eliminar la bicicleta.');
            }
        }
    };
    return{
        handleDelete
    };
};

export default useDeleteNotificacion;