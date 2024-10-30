// teoriaDeColas.service.jsx
import axios from 'axios'

const base_URL = 'http://localhost:4000/'


export const obtenerColaEsperaPrioridadFIFO = () => {
    return axios.get(`${base_URL}colaEspera`);  // Se asegura de recibir el ID del psicólogo
};

export const obtenerListaEntrevista = () => {
    return axios.get(`${base_URL}listaEntrevistas`);
};


export const agendarEntrevista = (formData) => {
    return axios.post(`${base_URL}agendarEntrevista`, formData);
};
