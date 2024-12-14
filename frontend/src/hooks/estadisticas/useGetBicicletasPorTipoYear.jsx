"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorTipoYear = (year) => {
    const [bicicletasPorTipoYear, setBicicletasPorTipoYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorTipoYear = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorTipoYear(year);
                setBicicletasPorTipoYear(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorTipoYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorTipoYear();
    }, [year]);

    return { bicicletasPorTipoYear, loading, error };
};

export default useGetBicicletasPorTipoYear;