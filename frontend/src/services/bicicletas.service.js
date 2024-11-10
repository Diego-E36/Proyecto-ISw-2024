import axios from './root.service.js';
import {formatBicicletasData} from "@helpers/formatBicicletas.js";

export async function getAllBicicletas() {
    try {
        const { bicicletasData } = await axios.get('/bicicletas/');
        return bicicletasData.map(formatBicicletasData);
    } catch (error) {
        return error.response.data;
    }
}

export async function updateBicicletas(data, id) {
    try {
        const response = await axios.patch(`/bicicletas/detail/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteBicicletas(id) {
    try {
        const response = await axios.delete(`/bicicletas/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export async function createBicicletas(data) {
    try {
        const response = await axios.post('/bicicletas/', data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}