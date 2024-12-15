"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioNombreCantidadUltimosTresMeses = () => {
    const [inventarioNombreCantidadUltimosTresMeses, setInventarioNombreCantidadUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioNombreCantidadUltimosTresMeses = async () => {
            try {
                const data = await estadisticasInvService.getInventarioNombreCantidadUltimosTresMeses();
                setInventarioNombreCantidadUltimosTresMeses(data);
            } catch (error) {
                setError(error.message);
                setInventarioNombreCantidadUltimosTresMeses([]);
            } finally {
                setLoading(false);
            }
        };

    fetchInventarioNombreCantidadUltimosTresMeses();
    }, []);

    return { inventarioNombreCantidadUltimosTresMeses, loading, error };
};

export default useGetInventarioNombreCantidadUltimosTresMeses;