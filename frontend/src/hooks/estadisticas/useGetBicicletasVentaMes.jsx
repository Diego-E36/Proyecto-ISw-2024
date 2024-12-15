"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVentaMes = (mes, year) => {
    const [bicicletasVentaMes, setBicicletasVentaMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVentaMes = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVentaMes(mes, year);
                setBicicletasVentaMes(data);
            } catch (error) {
                setError(error.message);
                setBicicletasVentaMes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasVentaMes();
    }, [mes, year]);

    return { bicicletasVentaMes, loading, error };
};

export default useGetBicicletasVentaMes;
