import axios from 'axios';

// Establece la URL base de tu backend
const base_URL = 'http://localhost:4000/';


export const getMateria = () => {
    return axios.get(`${base_URL}obtener/materia`);
};

export const getMateriaById = (idMateria) => {
    return axios.get(`${base_URL}obtener/materiaById/${idMateria}`); // Asegúrate de pasar el id
};



