"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorTipoMes = (mes) => {
    const [bicicletasPorTipoMes, setBicicletasPorTipoMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorTipoMes = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorTipoMes(mes);
                setBicicletasPorTipoMes(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorTipoMes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorTipoMes();
    }, [mes]);

    return { bicicletasPorTipoMes, loading, error };
};

export default useGetBicicletasPorTipoMes;