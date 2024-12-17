"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorTipoDia = (dia, mes, year) => {
    const [bicicletasPorTipoDia, setBicicletasPorTipoDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorTipoDia = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorTipoDia(dia, mes, year);
                setBicicletasPorTipoDia(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorTipoDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorTipoDia();
    }, [dia, mes, year]);

    return { bicicletasPorTipoDia, loading, error };
};

export default useGetBicicletasPorTipoDia;