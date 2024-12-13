"use strict";
import axios from './root.service.js';

//Servicio para obtener todas las bicicletas por tipo
export async function getAllBicicletasTipo() {
    try {
        const { data: allBicicletasTipoData } = await axios.get('/estadisticasBici/alltipo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return allBicicletasTipoData.data || [];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas por tipo:", error);
        return error.response.data;
    }
}

//Servicio para obtener bicicletas por tipo filtrado por meses
export async function getBicicletasPorTipoMes(mes) {
    try {
        const { data: bicicletasPorTipoData } = await axios.get(`/estadisticasBici/tipobici/${mes}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasPorTipoData.data || [];
    } catch (error) {
        console.error("Error al obtener bicicletas por tipo y mes:", error);
        return error.response.data;
    }
}

//Servicio para obtener todas las bicicletas a la venta por modelo
export async function getAllBicicletasVenta() {
    try {
        const { data: bicicletasVentaData } = await axios.get('/estadisticasBici/allventa', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasVentaData.data || [];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas a la venta:", error);
        return error.response.data;
    }
}

//Servicio para obtener bicicletas a la venta filtrado por meses
export async function getBicicletasVentaMes(mes) {
    try {
        const { data: bicicletasVentaData } = await axios.get(`/estadisticasBici/ventabici/${mes}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Datos recibidos del backend:", bicicletasVentaData);
        if (bicicletasVentaData.status === 204) {
            console.warn("No hay datos para el mes seleccionado:", mes);
            return [];
        }
        return bicicletasVentaData.data || [];

    } catch (error) {
        console.error("Error al obtener bicicletas a la venta:", error);
        return error.response.data;
    }
}

// Servicio para obtener todas las bicicletas por aro
export async function getAllBicicletasPorAro() {
    try {
        const { data: bicicletasPorAroData } = await axios.get('/estadisticasBici/allaros', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return bicicletasPorAroData.data || [];
    } catch (error) {
        console.error("Error al obtener todas las bicicletas por aro:", error);
        return error.response.data;
    }
}

//Servicio para obtener bicicletas por aro filtrado por meses
export async function getBicicletasPorAroMes(mes) {
    try {
        const { data: bicicletasPorAroData } = await axios.get(`/estadisticasBici/arobici/${mes}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("Datos recibidos del backend aro:", bicicletasPorAroData);
        return bicicletasPorAroData.data || [];
    } catch (error) {
        console.error("Error al obtener bicicletas por aro y mes:", error);
        return error.response.data;
    }
}

export default {
    getAllBicicletasTipo,
    getBicicletasPorTipoMes,
    getAllBicicletasVenta,
    getBicicletasVentaMes,
    getAllBicicletasPorAro,
    getBicicletasPorAroMes
};