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

export async function getInventarioNombreCantidadMesYear(mes, year) {
    try {
        const { data: inventarioNombreCantidadData } = await axios.get(`/estadisticas/nombrecantidad/${mes}/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioNombreCantidadData.data || [];
    } catch (error) {
        console.error("Error al obtener el nombre y la cantidad del inventario por mes y año con historial:", error);
        return error.response.data;
    }
}

export async function getInventarioNombreCantidadYear(year) {
    try {
        const { data: inventarioNombreCantidadYearData } = await axios.get(`/estadisticas/yearnombrecantidad/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioNombreCantidadYearData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario por año con historial:", error);
        return error.response.data;
    }
}

export async function getInventarioNombreCantidadUltimosTresMeses() {
    try {
        const { data: inventarioNombreCantidadData } = await axios.get('/estadisticas/nombrecantidadtresmeses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioNombreCantidadData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario por los últimos 3 meses con historial:", error);
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

export async function getInventarioProveedorMesYear(mes, year) {
    try {
        const { data: inventarioProveedorData } = await axios.get(`/estadisticas/proveedor/${mes}/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioProveedorData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario por proveedor por mes y año:", error);
        return error.response.data;
    }
}

export async function getInventarioProveedorYear(year) {
    try {
        const { data: inventarioProveedorYearData } = await axios.get(`/estadisticas/yearproveedor/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioProveedorYearData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario por proveedor por año:", error);
        return error.response.data;
    }
}

export async function getInventarioProveedorUltimosTresMeses() {
    try {
        const { data: inventarioProveedorData } = await axios.get('/estadisticas/proveedortresmeses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return inventarioProveedorData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario por proveedor por los últimos 3 meses:", error);
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

export async function getInventarioBajoStockRestockMesYear(mes, year) {
    try {
        const { data: bajoStockRestockData } = await axios.get(`/estadisticas/bajostock/${mes}/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bajoStockRestockData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario con bajo stock y restock sugerido por mes y año:", error);
        return error.response.data;
    }
}

export async function getInventarioBajoStockRestockYear(year) {
    try {
        const { data: bajoStockRestockYearData } = await axios.get(`/estadisticas/yearbajostock/${year}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bajoStockRestockYearData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario con bajo stock y restock sugerido por año:", error);
        return error.response.data;
    }
}

export async function getInventarioBajoStockRestockUltimosTresMeses() {
    try {
        const { data: bajoStockRestockData } = await axios.get('/estadisticas/bajostocktresmeses', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Datos recuperados desde el backend en servicefront:", bajoStockRestockData.data); // Depuración
        return bajoStockRestockData.data || [];
    } catch (error) {
        console.error("Error al obtener el inventario con bajo stock y restock sugerido por los últimos 3 meses:", error);
        return error.response.data;
    }
}


export default {
    getNombreYCantidadInventario,
    getInventarioNombreCantidadMesYear,
    getInventarioNombreCantidadYear,
    getInventarioNombreCantidadUltimosTresMeses,
    getDistribucionProductosPorProveedor,
    getInventarioProveedorMesYear,
    getInventarioProveedorYear,
    getInventarioProveedorUltimosTresMeses,
    getProductosBajoStockYRestockSugerido,
    getInventarioBajoStockRestockMesYear,
    getInventarioBajoStockRestockYear,
    getInventarioBajoStockRestockUltimosTresMeses
};