import { useState } from "react";
import { updateBicicletas } from "@services/bicicletas.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostBicicletas } from "@helpers/formatBicicletas.js";

const useEditBicicleta = (setBicicletas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataBicicleta, setDataBicicleta] = useState([]);

    const handleClickUpdate = () => {
        if (dataBicicleta.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedBicicletaData) => {
        if(updatedBicicletaData){
            try{
                const updatedBicicleta = await updateBicicletas(updatedBicicletaData, dataBicicleta[0].id);
                showSuccessAlert('¡Actualizado!','La bicicleta ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                const formattedBicicleta = formatPostBicicletas(updatedBicicleta);

                setBicicletas(prevBicicletas => prevBicicletas.map(bicicleta => {
                    console.log("Bicicleta actual:", bicicleta);
                    if (bicicleta.id === formattedBicicleta.id) {
                        console.log("Reemplazando con:", formattedBicicleta);
                    }
                    return bicicleta.id === formattedBicicleta.id ? formattedBicicleta : bicicleta;
                }));

                setDataBicicleta([]);
            }catch(error){
                console.error('Error al actualizar la bicicleta:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar la bicicleta.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataBicicleta,
        setDataBicicleta
    };
};

export default useEditBicicleta;