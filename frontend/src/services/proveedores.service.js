// Imports
import axios from './root.service.js';
import { formatProveedoresData } from '@helpers/formatProveedores.js';

// Funciones
export async function getAllProveedores() {
    try {
        const { data: proveedoresData } = await axios.get('/proveedores/all');
        return proveedoresData.data.map(formatProveedoresData); // devuelve con el formato correcto
    } catch (error) {
        return error.response.data;
    }
}

export async function updateProveedores(data, id) {
    try {
        const response = await axios.patch(`/proveedores/${id}`, data);
        return response.data.data; // data === status, message, data | data.data === data
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteProveedores(id) {
    try {
        const response = await axios.delete(`/proveedores/${id}`);
        return response.data; // data === status, message, data
    } catch (error) {
        return error.response.data;
    }
}

export async function createProveedores(data) {
    try {
        const response = await axios.post('/proveedores/', data);
        return response.data.data; // data === status, message, data | data.data === data
    } catch (error) {
        return error.response.data;
    }
}