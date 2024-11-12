import { useState, useEffect } from "react";
import { getAllBicicletas } from '@services/bicicletas.service.js'

const useGetBicicletas = () => {
    const [bicicletas, setBicicletas] = useState([]);

    const fetchBicicletas = async () => {
        try {
            const response = await getAllBicicletas();
            const formattedData = response.map(bicicleta => ({
                id: bicicleta.id,
                numeroSerie: bicicleta.numeroSerie,
                marca: bicicleta.marca,
                modelo: bicicleta.modelo,
                color: bicicleta.color,
                tipo: bicicleta.tipo,
                aro: bicicleta.aro,
                venta: bicicleta.venta,
                updatedAt: bicicleta.updatedAt
            }));
            dataLogged(formattedData);
            setBicicletas(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchBicicletas();
    }, []);

    const dataLogged = (bicicletas) => {
        try {
            const { numeroSerie } = JSON.parse(sessionStorage.getItem('bicicletas'));
            for(let i = 0; i < bicicletas.length ; i++) {
                if(bicicletas[i].numeroSerie === numeroSerie) {
                    bicicletas.splice(i, 1);
                }
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return { bicicletas, fetchBicicletas, setBicicletas };
}

export default useGetBicicletas;