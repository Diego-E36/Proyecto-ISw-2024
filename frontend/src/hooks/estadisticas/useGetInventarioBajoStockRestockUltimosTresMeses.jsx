"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioBajoStockRestockUltimosTresMeses = () => {
    const [inventarioBajoStockRestockUltimosTresMeses, setInventarioBajoStockRestockUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioBajoStockRestockUltimosTresMeses = async () => {
            try {
                const data = await estadisticasInvService.getInventarioBajoStockRestockUltimosTresMeses();
                setInventarioBajoStockRestockUltimosTresMeses(data);
            } catch (error) {
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