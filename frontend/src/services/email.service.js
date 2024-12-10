import axios from './root.service.js';

export async function sendEmail(data) {
    try {
        const response = await axios.post('email/send/', data);
        return response.data.data; 
    } catch (error) {
        return error.response.data;
    }
}