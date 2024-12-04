"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVenta = () => {
    const [bicicletasVenta, setBicicletasVenta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVenta = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVenta();

                if (data && Array.isArray(data)) {
                    setBicicletasVenta(data.length > 0 ? data : []);
                } else {
                    setBicicletasVenta([]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasVenta();
    }, []);

    return { bicicletasVenta, loading, error };
};

export default useGetBicicletasVenta;