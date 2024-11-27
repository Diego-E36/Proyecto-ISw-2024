import axios from './root.service.js';
import {formatBicicletasData} from "@helpers/formatBicicletas.js";

export async function getAllBicicletas() {
    try {
        const { data: bicicletasData } = await axios.get('/bicicleta/');
        return bicicletasData.data.map(formatBicicletasData);
    } catch (error) {
        return error.response.data;
    }
}

export async function updateBicicletas(data, id) {
    try {
        const response = await axios.patch(`/bicicleta/detail/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteBicicletas(id) {
    try {
        const response = await axios.delete(`/bicicleta/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data
    }
}

export async function createBicicletas(data) {
    try {
        const response = await axios.post('/bicicleta/', data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}