"use strict";
import { useState, useEffect } from 'react';
import estadisticasService from '@services/estadisticasInv.service.js';

const useGetNombreYCantidadInventario = () => {
    const [inventario, setInventario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                const data = await estadisticasService.getNombreYCantidadInventario();
                setInventario(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventario();
    }, []);

    return { inventario, loading, error };
};

export default useGetNombreYCantidadInventario;