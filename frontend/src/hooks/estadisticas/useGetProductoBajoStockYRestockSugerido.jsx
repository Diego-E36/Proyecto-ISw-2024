"use strict";
import { useState, useEffect } from 'react';
import estadisticasService from '@services/estadisticasInv.service.js';

const useProductosBajoStockYRestockSugerido = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await estadisticasService.getProductosBajoStockYRestockSugerido();
                setProductos(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    return { productos, loading, error };
};

export default useProductosBajoStockYRestockSugerido;
