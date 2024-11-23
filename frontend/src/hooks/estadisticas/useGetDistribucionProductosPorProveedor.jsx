"use strict";
import { useState, useEffect } from 'react';
import estadisticasService from '@services/estadisticasInv.service.js';

const useGetDistribucionProductosPorProveedor = () => {
    const [distribucion, setDistribucion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDistribucion = async () => {
            try {
                const data = await estadisticasService.getDistribucionProductosPorProveedor();
                setDistribucion(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDistribucion();
    }, []);

    return { distribucion, loading, error };
};

export default useGetDistribucionProductosPorProveedor;