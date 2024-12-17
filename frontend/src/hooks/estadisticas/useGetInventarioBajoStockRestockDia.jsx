"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioBajoStockRestockDia = (dia, mes, year) => {
    const [inventarioBajoStockRestockDia, setInventarioBajoStockRestockDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioBajoStockRestockDia = async () => {
            try {
                const data = await estadisticasInvService.getInventarioBajoStockRestockDia(dia, mes, year);
                setInventarioBajoStockRestockDia(data);
            } catch (error) {
                setError(error.message);
                setInventarioBajoStockRestockDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioBajoStockRestockDia();
    }, [dia, mes, year]);

return { inventarioBajoStockRestockDia, loading, error };
}

export default useGetInventarioBajoStockRestockDia;