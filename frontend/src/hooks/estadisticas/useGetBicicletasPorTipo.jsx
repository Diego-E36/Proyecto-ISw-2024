"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorTipo = () => {
    const [bicicletasPorTipo, setBicicletasPorTipo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorTipo = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorTipo();
                setBicicletasPorTipo(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasPorTipo();
    }, []);

    return { bicicletasPorTipo, loading, error };
};

export default useGetBicicletasPorTipo;