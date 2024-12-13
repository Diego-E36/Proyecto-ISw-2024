"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetAllBicicletasTipo = () => {
    const [bicicletasAllTipo, setBicicletasAllTipo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasAllTipo = async () => {
            try {
                const data = await estadisticasBiciService.getAllBicicletasTipo();
                setBicicletasAllTipo(data);
            } catch (error) {
                setError(error.message);
                setBicicletasAllTipo([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBicicletasAllTipo();
    }, []);

    return { bicicletasAllTipo, loading, error };
};

export default useGetAllBicicletasTipo;