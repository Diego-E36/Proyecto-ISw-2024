"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVentaYear = (year) => {
    const [bicicletasVentaYear, setBicicletasVentaYear] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVentaYear = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVentaYear(year);
                setBicicletasVentaYear(data);
            } catch (error) {
                setError(error.message);
                setBicicletasVentaYear([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasVentaYear();
    }, [year]);

    return { bicicletasVentaYear, loading, error };
};

export default useGetBicicletasVentaYear;