// Imports
import { useState, useEffect } from 'react';
import { getAllProveedores } from '@services/proveedores.service.js';

// Hook
const useGetProveedores = () => {
    const [proveedores, setProveedores] = useState([]);

    // Obtener proveedores
    const fetchProveedores = async () => {
        try {
            const response = await getAllProveedores();
            const formattedData = response.map(proveedor => ({
                id: proveedor.id,
                rut: proveedor.rut,
                nombre: proveedor.nombre,
                email: proveedor.email,
                telefono: proveedor.telefono,
                createdAt: proveedor.createdAt,
                updatedAt: proveedor.updatedAt
            }));
            dataLogged(formattedData);
            setProveedores(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => { fetchProveedores(); }, [])

    const dataLogged = (proveedores) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('proveedores'));
            // Recorrer todos los proveedores
            for(let i = 0; i < proveedores.length ; i++) {
                if(proveedores[i].rut === rut) {
                    proveedores.splice(i, 1);
                }
            }            
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    // Retornar valores
    return { proveedores, fetchProveedores, setProveedores };
}

export default useGetProveedores;