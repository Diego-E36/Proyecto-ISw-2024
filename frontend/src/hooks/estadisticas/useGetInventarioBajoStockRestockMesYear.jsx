"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioBajoStockRestockMesYear = (mes, year) => {
    const [inventarioBajoStockRestockMesYear, setInventarioBajoStockRestockMesYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioBajoStockRestockMesYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioBajoStockRestockMesYear(mes, year);
                setInventarioBajoStockRestockMesYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioBajoStockRestockMesYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioBajoStockRestockMesYear();
    }, [mes, year]);

return { inventarioBajoStockRestockMesYear, loading, error };
};

export default useGetInventarioBajoStockRestockMesYear;