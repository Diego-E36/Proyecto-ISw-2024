"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAroMes= (mes, year) => {
    const [bicicletasPorAroMes, setBicicletasPorAroMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAroMes = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAroMes(mes, year);
                setBicicletasPorAroMes(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorAroMes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorAroMes();
    }, [mes, year]);

    return { bicicletasPorAroMes, loading, error };
};

export default useGetBicicletasPorAroMes;