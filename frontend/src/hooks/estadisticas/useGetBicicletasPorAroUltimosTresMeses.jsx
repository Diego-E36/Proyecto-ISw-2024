"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorAroUltimosTresMeses = () => {
    const [bicicletasPorAroUltimosTresMeses, setBicicletasPorAroUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorAroUltimosTresMeses = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorAroUltimosTresMeses();
                setBicicletasPorAroUltimosTresMeses(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorAroUltimosTresMeses([]);
            } finally {
                setLoading(false);
            }
        };
    
    fetchBicicletasPorAroUltimosTresMeses();
    }, []);

    return { bicicletasPorAroUltimosTresMeses, loading, error };
};

export default useGetBicicletasPorAroUltimosTresMeses;