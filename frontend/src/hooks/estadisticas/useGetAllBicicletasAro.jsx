"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetAllBicicletasAro = () => {
    const [bicicletasAllAro, setBicicletasAllAro] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletas = async () => {
            setLoading(true);
            try {
                const data = await estadisticasBiciService.getAllBicicletasPorAro();
                setBicicletasAllAro(data);
            } catch (error) {
                setError(error.message);
                setBicicletasAllAro([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletas();
    }, []);

    return { bicicletasAllAro, loading, error };
};

export default useGetAllBicicletasAro;
