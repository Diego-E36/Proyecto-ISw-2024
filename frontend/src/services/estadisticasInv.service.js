"use strict";
import axios from './root.service.js';

export async function getNombreYCantidadInventario() {
    try {
        const { data: inventarioData } = await axios.get('/estadisticas/inv', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioData.data;
    } catch (error) {
        console.error("Error al obtener el nombre y la cantidad del inventario:", error);
        return error.response.data;
    }
}

export default {
    getNombreYCantidadInventario,
};