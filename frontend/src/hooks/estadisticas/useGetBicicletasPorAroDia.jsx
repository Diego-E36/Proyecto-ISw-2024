"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAroDia = (dia, mes, year) => {
    const [bicicletasPorAroDia, setBicicletasPorAroDia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAroDia = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAroDia(dia, mes, year);
                setBicicletasPorAroDia(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorAroDia([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorAroDia();
    }, [dia, mes, year]);

    return { bicicletasPorAroDia, loading, error };
};

export default useGetBicicletasPorAroDia;