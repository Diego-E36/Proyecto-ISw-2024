"use strict";
import axios from './root.service.js';

// Servicio para obtener bicicletas por tipo
export async function getBicicletasPorTipo() {
    try {
        const { data: bicicletasPorTipoData } = await axios.get('/estadisticasBici/tipobici', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasPorTipoData.data;
    } catch (error) {
        console.error("Error al obtener la distribución de bicicletas por tipo:", error);
        return error.response.data;
    }
}

// Servicio para obtener bicicletas a la venta
export async function getBicicletasVenta() {
    try {
        const { data: bicicletasVentaData } = await axios.get('/estadisticasBici/ventabici', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasVentaData.data;
    } catch (error) {
        console.error("Error al obtener bicicletas a la venta:", error);
        return error.response.data;
    }
}

// Servicio para oobtener bicicletas por aro
export async function getBicicletasPorAro() {
    try {
        const { data: bicicletasPorAroData } = await axios.get('/estadisticasBici/arobici', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasPorAroData.data;
    } catch (error) {
        console.error("Error al obtener bicicletas por aro:", error);
        return error.response.data;
    }
}

export default {
    getBicicletasPorTipo,
    getBicicletasVenta,
    getBicicletasPorAro
};