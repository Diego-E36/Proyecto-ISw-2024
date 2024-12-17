"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVentaDia = (dia, mes, year) => {
    const [bicicletasVentaDia, setBicicletasVentaDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVentaDia = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVentaDia(dia, mes, year);
                setBicicletasVentaDia(data);
            } catch (error) {
                setError(error.message);
                setBicicletasVentaDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasVentaDia();
    }, [dia, mes, year]);

    return { bicicletasVentaDia, loading, error };
};

export default useGetBicicletasVentaDia;