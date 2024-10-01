import axios from 'axios'

const base_URL = 'http://localhost:4000/'

export const getDirecciones = () =>{
    return axios.get(`${base_URL}direcciones`);
    }