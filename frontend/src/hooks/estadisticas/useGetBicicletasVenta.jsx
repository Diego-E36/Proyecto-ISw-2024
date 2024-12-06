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
                    const allValuesAreZero = data.every(item => item.venta === 0);
                    if (allValuesAreZero) {
                        setBicicletasVenta([]);
                    } else {
                        setBicicletasVenta(data);
                    }
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