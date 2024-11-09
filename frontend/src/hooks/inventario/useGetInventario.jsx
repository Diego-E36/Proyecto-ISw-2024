import { useState, useEffect } from 'react';
import { getAllInventario } from '@services/inventario.service.js';
import { set } from 'lodash';

const useInventario = () => {
    const [inventario, setInventario] = useState([]);

    const fetchInventario = async () => {
        try {
            const response = await getAllInventario();
            const formattedDataInv = response.map(inventario => ({
                numeroSerie: inventario.numeroSerie,
                nombreStock: inventario.nombreStock,
                cantidadStock: inventario.cantidadStock,
                colorUnidad: inventario.colorUnidad,
                precioUnidad: inventario.precioUnidad,
                marcaUnidad: inventario.marcaUnidad
            }));
            dataLogged(formattedDataInv);
            setInventario(formattedDataInv);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchInventario();
    }, []);

    const dataLogged = (formattedDataInv) => {
        try {
            const { numeroSerie } = JSON.parse(sessionStorage.getItem('inventario'));
            for(let i = 0; i < formattedDataInv.length ; i++) {
                if(formattedDataInv[i].numeroSerie === numeroSerie) {
                    formattedDataInv.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { inventario, fetchInventario, setInventario };
};

export default useInventario;