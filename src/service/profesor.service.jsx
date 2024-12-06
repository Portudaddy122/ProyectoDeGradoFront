import axios from 'axios';

const base_URL = 'http://localhost:4000/';

export const getProfesor = () => {
    return axios.get(`${base_URL}obtener/profesores`);
};

export const getProfesorById = (idprofesor) => {
    return axios.get(`${base_URL}profesor/${idprofesor}`); // Asegúrate de pasar el id
};

export const getProfesoresConHorarios = () => {
    return axios.get(`${base_URL}obtener/profesoresHorarios`);
  };
  

export const postProfesor = (formData) => {
    return axios.post(`${base_URL}crear/profesor`, formData);
};

export const putProfesor = (idprofesor, formData) => {
    return axios.put(`${base_URL}actualizar/profesor/${idprofesor}`, formData); // Asegúrate de pasar el id
};

export const deleteProfesor = (idprofesor) => {
    return axios.delete(`${base_URL}eliminar/profesor/${idprofesor}`); // Asegúrate de pasar el id
};

export const getCountTeachers = async () => {
    try {
        const response = await fetch(`${base_URL}obtener/cantidad/profesores`); // Cambia a tu URL
        const dataTeacher = await response.json();
        return parseInt(dataTeacher.total, 10); // Convierte el total a número
    } catch (error) {
        console.error('Error fetching user count:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
