"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioNombreCantidadDia = (dia, mes, year) => {
    const [inventarioNombreCantidadDia, setInventarioNombreCantidadDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioNombreCantidadDia = async () => {
            try {
                const data = await estadisticasInvService.getInventarioNombreCantidadDia(dia, mes, year);
                setInventarioNombreCantidadDia(data);
            } catch (error) {
                setError(error.message);
                setInventarioNombreCantidadDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioNombreCantidadDia();
    }, [dia, mes, year]);

return { inventarioNombreCantidadDia, loading, error };
}

export default useGetInventarioNombreCantidadDia;