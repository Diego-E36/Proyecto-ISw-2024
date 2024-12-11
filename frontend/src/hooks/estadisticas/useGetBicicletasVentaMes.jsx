"use strict";
import { useState, useEffect } from 'react';
import estadisticasBiciService from '@services/estadisticasBici.service.js';

const useGetBicicletasVentaMes = (mes) => {
    const [bicicletasVentaMes, setBicicletasVentaMes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBicicletasVentaMes = async () => {
            try {
                const data = await estadisticasBiciService.getBicicletasVentaMes(mes);
        
                if (!data || data.length === 0) {
                    console.info("No hay datos para el mes seleccionado:", mes);
                }
        
                setBicicletasVentaMes(data);
            } catch (error) {
                setError(error.message);
                setBicicletasVentaMes([]);
            } finally {
                setLoading(false);
            }
        };
    
        if (mes && !isNaN(mes)) {
            fetchBicicletasVentaMes();
        }
    }, [mes]);

    return { bicicletasVentaMes, loading, error };
};

export default useGetBicicletasVentaMes;
