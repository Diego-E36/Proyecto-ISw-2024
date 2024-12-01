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

export default {
    getBicicletasPorTipo
};