// Imports
import axios from './root.service.js';
import { formatInventarioData } from '@helpers/formatInventario.js';

// Funciones
export async function getAllInventario() {
    try {
        const { data: inventarioData } = await axios.get('/inventario/all');
        return inventarioData.data.map(formatInventarioData); // devuelve con el formato correcto
    } catch (error) {
        return error.response.data;
    }
}

export async function updateInventario(data, id) {
    try {
        const response = await axios.patch(`/inventario/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteInventario(id) {
    try {
        const response = await axios.delete(`/inventario/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createInventario(data) {
    try {
        const response = await axios.post('/inventario/', data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}
