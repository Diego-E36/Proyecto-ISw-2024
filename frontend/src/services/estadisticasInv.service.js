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

export async function getDistribucionProductosPorProveedor() {
    try {
        const { data: distribucionData } = await axios.get('/estadisticas/proveedor', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return distribucionData.data;
    } catch (error) {
        console.error("Error al obtener la distribución de productos por proveedor:", error);
        return error.response.data;
    }
}

export async function getProductosBajoStockYRestockSugerido() {
    try {
        const { data: bajoStockData } = await axios.get('/estadisticas/bajostock', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bajoStockData.data;
    } catch (error) {
        console.error("Error al obtener productos con bajo stock y restock sugerido:", error);
        return error.response.data;
    }
}


export default {
    getNombreYCantidadInventario,
    getDistribucionProductosPorProveedor,
    getProductosBajoStockYRestockSugerido
};