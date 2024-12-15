"use strict";
import { useState, useEffect } from 'react';
import estadisticasInvService from '@services/estadisticasInv.service.js';

const useGetInventarioProveedorUltimosTresMeses = () => {
    const [inventarioProveedorTresMeses, setInventarioProveedorTresMeses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventarioProveedorTresMeses = async () => {
            try {
                const data = await estadisticasInvService.getInventarioProveedorUltimosTresMeses();
                setInventarioProveedorTresMeses(data);
            } catch (error) {
                setError(error.message);
                setInventarioProveedorTresMeses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventarioProveedorTresMeses();
    }, []);

    return { inventarioProveedorTresMeses, loading, error };
};

export default useGetInventarioProveedorUltimosTresMeses;