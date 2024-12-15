"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioBajoStockRestockYear = (year) => {
    const [inventarioBajoStockRestockYear, setInventarioBajoStockRestockYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioBajoStockRestockYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioBajoStockRestockYear(year);
                setInventarioBajoStockRestockYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioBajoStockRestockYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioBajoStockRestockYear();
    }, [year]);

    return { inventarioBajoStockRestockYear, loading, error };
};

export default useGetInventarioBajoStockRestockYear;