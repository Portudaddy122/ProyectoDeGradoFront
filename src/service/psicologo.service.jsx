import axios from 'axios'

const base_URL = 'http://localhost:4000/'


export const postPsicologo = () =>{
    return axios.delete(`${base_URL}crear/profesor`);
    }