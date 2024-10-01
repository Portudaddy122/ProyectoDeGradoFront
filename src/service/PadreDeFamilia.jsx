import axios from 'axios'

const base_URL = 'http://localhost:4000/'



export const postPadre = () =>{
    return axios.post(`${base_URL}crear/padredefamilia`);
    }