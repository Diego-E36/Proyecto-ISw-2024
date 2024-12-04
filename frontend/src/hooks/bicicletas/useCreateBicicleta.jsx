import { useState, useEffect } from "react";
import { createBicicletas } from "@services/bicicletas.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostBicicletas } from "@helpers/formatBicicletas.js";

const useCreateBicicleta = (fetchBicicletas) => {
    const [bicicleta, setBicicleta] = useState({
        numeroSerie: "",
        marca: "",
        modelo: "",
        color: "",
        tipo: "",
        aro: "",
        venta: "",
    });
    const [isPopupOpenCreate, setIsPopupOpenCreate] = useState(false);

    const createBicicleta = async (bicicleta) => {
        try {
            const response = await createBicicletas(formatPostBicicletas(bicicleta));
            if (response.error) {
                showErrorAlert(response.message);
            } else {
                showSuccessAlert("Bicicleta creada exitosamente");
                fetchBicicletas();
                setIsPopupOpenCreate(false);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    const handleCreate = (formData) => {
        createBicicleta(formData).then(); // Pasar los datos recibidos desde el formulario
    };

    return {
        createBicicleta,
        bicicleta,
        setBicicleta,
        isPopupOpenCreate,
        setIsPopupOpenCreate,
        handleCreate
    };
};

export default useCreateBicicleta;