"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioProveedorYear = (year) => {
    const [inventarioProveedorYear, setInventarioProveedorYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioProveedorYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioProveedorYear(year);
                setInventarioProveedorYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioProveedorYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioProveedorYear();
    }, [year]);

    return { inventarioProveedorYear, loading, error };
};

export default useGetInventarioProveedorYear;