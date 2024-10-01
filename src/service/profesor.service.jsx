import axios from 'axios'

const base_URL = 'http://localhost:4000/'

export const postProfesor = (formData) => {
    return axios.post(`${base_URL}crear/profesor`, formData);
}

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
