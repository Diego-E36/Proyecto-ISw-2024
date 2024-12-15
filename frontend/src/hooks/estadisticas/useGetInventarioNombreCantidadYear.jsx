"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioNombreCantidadYear = (year) => {
    const [inventarioNombreCantidadYear, setInventarioNombreCantidadYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioNombreCantidadYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioNombreCantidadYear(year);
                setInventarioNombreCantidadYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioNombreCantidadYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioNombreCantidadYear();
    }, [year]);

    return { inventarioNombreCantidadYear, loading, error };
};

export default useGetInventarioNombreCantidadYear;