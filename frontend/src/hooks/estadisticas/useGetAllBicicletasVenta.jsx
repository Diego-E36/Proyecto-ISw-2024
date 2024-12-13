"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetAllBicicletasVenta = () => {
    const [bicicletasAllVenta, setBicicletas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletas = async () => {
            setLoading(true);
            try {
                const data = await estadisticasBiciService.getAllBicicletasVenta();
                setBicicletas(data);
            } catch (error) {
                setError(error.message);
                setBicicletas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletas();
    }, []);

    return { bicicletasAllVenta, loading, error };
};

export default useGetAllBicicletasVenta;
