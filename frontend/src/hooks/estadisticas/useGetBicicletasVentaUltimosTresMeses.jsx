"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVentaUltimosTresMeses = () => {
    const [bicicletasVentaUltimosTresMeses, setBicicletasVentaUltimosTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVentaUltimosTresMeses = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVentaUltimosTresMeses();
                setBicicletasVentaUltimosTresMeses(data);
            } catch (error) {
                setError(error.message);
                setBicicletasVentaUltimosTresMeses([]);
            } finally {
                setLoading(false);
            }
        };

    fetchBicicletasVentaUltimosTresMeses();
    }, []);

    return { bicicletasVentaUltimosTresMeses, loading, error };
};

export default useGetBicicletasVentaUltimosTresMeses;