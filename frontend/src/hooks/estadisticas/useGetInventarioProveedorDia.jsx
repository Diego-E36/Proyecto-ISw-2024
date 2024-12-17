"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioProveedorDia = (dia, mes, year) => {
    const [inventarioProveedorDia, setInventarioProveedorDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioProveedorDia = async () => {
            try {
                const data = await estadisticasInvService.getInventarioProveedorDia(dia, mes, year);
                setInventarioProveedorDia(data);
            } catch (error) {
                setError(error.message);
                setInventarioProveedorDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioProveedorDia();
    }, [dia, mes, year]);

return { inventarioProveedorDia, loading, error };
}

export default useGetInventarioProveedorDia;