import axios from './root.service.js';
import { formatInventarioData } from '@helpers/formatInventario.js';

export async function getAllInventario() {
    try {
        const { inventarioData } = await axios.get('/inventario/');
        const formattedData = inventarioData.map(formatInventarioData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateInventario(data, numeroSerie) {
    try {
        const response = await axios.patch(`/inventario/detail/?numeroSerie=${numeroSerie}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteInventario(numeroSerie) {
    try {
        const response = await axios.delete(`/inventario/detail/?numeroSerie=${numeroSerie}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}