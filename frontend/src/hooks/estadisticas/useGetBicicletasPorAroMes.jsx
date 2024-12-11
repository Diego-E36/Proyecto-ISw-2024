"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAroMes= (mes) => {
    const [bicicletasPorAroMes, setBicicletasPorAroMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAroMes = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAroMes(mes);
                setBicicletasPorAroMes(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorAroMes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorAroMes();
    }, [mes]);

    return { bicicletasPorAroMes, loading, error };
};

export default useGetBicicletasPorAroMes;