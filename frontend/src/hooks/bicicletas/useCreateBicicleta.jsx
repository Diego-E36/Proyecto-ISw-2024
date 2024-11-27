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

    const createBicicleta = async (bicicleta) => {
        try {
            const response = await createBicicletas(formatPostBicicletas(bicicleta));
            if (response.error) {
                showErrorAlert(response.message);
            } else {
                showSuccessAlert("Bicicleta creada exitosamente");
                fetchBicicletas();
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchBicicletas();
    }, []);

    return {
        createBicicleta,
        bicicleta,
        setBicicleta,
    };
};

export default useCreateBicicleta;