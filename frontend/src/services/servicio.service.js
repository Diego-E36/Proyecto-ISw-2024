import axios from './root.service.js';
import { formatServicioData } from '@helpers/formatServicio.js';

export async function createServicio(data) {
    try {
        const response = await axios.post('/servicio/', data);
        return response.data.data; 
    } catch (error) {
        return error.response.data;
    }
}

export async function getAllServicios() {
    try {
        const { data: serviciosData } = await axios.get('/servicio/all');
        return serviciosData.data.map(formatServicioData); // devuelve con el formato correcto
    } catch (error) {
        return error.response.data;
    }
}

export async function  updateServicio(data, id) {
    try {
        const response = await axios.patch(`/servicio/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
    
}