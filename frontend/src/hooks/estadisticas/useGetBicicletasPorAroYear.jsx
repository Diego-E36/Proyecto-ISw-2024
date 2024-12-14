"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAroYear = (year) => {
    const [bicicletasPorAroYear, setBicicletasPorAroYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAroYear = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAroYear(year);
                setBicicletasPorAroYear(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorAroYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorAroYear();
    }, [year]);

    return { bicicletasPorAroYear, loading, error };
};

export default useGetBicicletasPorAroYear;