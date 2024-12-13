// Imports
import axios from './root.service.js';
import { formatHistorialData } from '@helpers/formatHistorial.js';

// Funciones
export async function getAllHistorial() {
    try {
        const { data: historialData } = await axios.get('/historial/');
        return historialData.data.map(formatHistorialData); 
    } catch (error) {
        return error.response.data;
    }
}