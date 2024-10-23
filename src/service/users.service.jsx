import axios from 'axios'

const base_URL = 'http://localhost:4000/'

export const getUsuarios = async () => {
    return axios.get(`${base_URL}obtener/usuarios`);
};

// Servicio para filtrar usuarios
export const filterUsuarios = (searchTerm) => {
    return axios.get(`${baseURL}/usuarios/filtrar`, { params: { searchTerm } });
  };