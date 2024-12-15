"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioBajoStockRestockUltimosTresMeses = () => {
    const [inventarioBajoStockRestockUltimosTresMeses, setInventarioBajoStockRestockUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioBajoStockRestockUltimosTresMeses = async () => {
            console.log("Fetching data..."); //Depuración
            try {
                const data = await estadisticasInvService.getInventarioBajoStockRestockUltimosTresMeses();
                console.log("Datos recuperados desde el backend en hook 3 meses:", data); //Depuración
                setInventarioBajoStockRestockUltimosTresMeses(data);
            } catch (error) {
                console.error("Error al obtener inventario con bajo stock y restock sugerido:", error); //Depuración
                setError(error.message);
                setInventarioBajoStockRestockUltimosTresMeses([]);
            } finally {
                setLoading(false);
            }
        };

    fetchInventarioBajoStockRestockUltimosTresMeses();
    }, []);

    return { inventarioBajoStockRestockUltimosTresMeses, loading, error };
};

export default useGetInventarioBajoStockRestockUltimosTresMeses;