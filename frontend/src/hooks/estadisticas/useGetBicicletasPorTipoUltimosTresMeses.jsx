"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasPorTipoUltimosTresMeses = () => {
    const [bicicletasPorTipoUltimosTresMeses, setBicicletasPorTipoUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasPorTipoUltimosTresMeses = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasPorTipoUltimosTresMeses();
                setBicicletasPorTipoUltimosTresMeses(data);
            } catch (error) {
                setError(error.message);
                setBicicletasPorTipoUltimosTresMeses([]);
            } finally {
                setLoading(false);
            }
        };

    fetchBicicletasPorTipoUltimosTresMeses();
    }, []);

    return { bicicletasPorTipoUltimosTresMeses, loading, error };
};

export default useGetBicicletasPorTipoUltimosTresMeses;