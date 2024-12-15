"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioNombreCantidadMesYear = (mes, year) => {
    const [inventarioNombreCantidadMesYear, setInventarioNombreCantidadMesYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioNombreCantidadMesYear = async () => {
            try {
                const data = await estadisticasInvService.getInventarioNombreCantidadMesYear(mes, year);
                setInventarioNombreCantidadMesYear(data);
            } catch (error) {
                setError(error.message);
                setInventarioNombreCantidadMesYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioNombreCantidadMesYear();
    }, [mes, year]);

return { inventarioNombreCantidadMesYear, loading, error };
};

export default useGetInventarioNombreCantidadMesYear;