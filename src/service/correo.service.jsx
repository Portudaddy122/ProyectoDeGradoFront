import axios from 'axios';

const base_URL = 'http://localhost:4000/';

// Servicio para enviar un correo electrónico
export const enviarCorreo = (data) => {
    return axios.post(`${base_URL}enviarCorreo`, data);
};
