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
                
                if (data && Array.isArray(data)) {
                    if (data.length > 0) {
                        setProductos(data);
                    } 
                }
                else {
                    setProductos([]);
                    }
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
