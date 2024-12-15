"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioProveedorMesYear = (mes, year) => {
    const [inventarioProveedorMesYear, setInventarioProveedorMesYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioProveedorMesYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioProveedorMesYear(mes, year);
                setInventarioProveedorMesYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioProveedorMesYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioProveedorMesYear();
    }, [mes, year]);

    return { inventarioProveedorMesYear, loading, error };
};

export default useGetInventarioProveedorMesYear;