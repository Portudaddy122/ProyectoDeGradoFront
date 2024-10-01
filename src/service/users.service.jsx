import axios from 'axios'

const base_URL = 'http://localhost:4000/'

export const getUsuarios = async () => {
    return axios.get(`${base_URL}obtener/persona`);
};

export const getUserById = async(idpersona)=>{
    return axios.get(`${base_URL}persona/${idpersona}`);

} 
export const updateUser = async(idpersona, data)=>{
    return axios.put(`${base_URL}actualizar/persona/${idpersona}`, data);

    }   // función para actualizar un usuario
export const deleteUser = (idpersona) =>{
    return axios.delete(`${base_URL}eliminar/persona/${idpersona}`);

    }

        // users.service.jsx
export const getCountUsers = async () => {
    try {
      const response = await fetch(`${base_URL}obtener/cantidad/users`); // Cambia a tu URL
      const data = await response.json();
      return parseInt(data.total, 10); // Convierte el total a número
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };