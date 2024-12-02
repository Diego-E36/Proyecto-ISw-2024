"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAro = () => {
    const [bicicletasPorAro, setBicicletasPorAro] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAro = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAro();
                setBicicletasPorAro(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorAro();
    }, []);

    return { bicicletasPorAro, loading, error };
};

export default useGetBicicletasPorAro;