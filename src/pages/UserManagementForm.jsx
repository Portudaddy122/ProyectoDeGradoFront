// userManagementForm.jsx
import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm.jsx';
import { postAdministrador } from '../service/administrador.service.jsx';
import { postProfesor } from '../service/profesor.service.jsx';
import { postPadre } from '../service/PadreDeFamilia.jsx';
import { postEstudiante } from '../service/Estudiante.service.jsx';
import { postPsicologo } from '../service/psicologo.service.jsx';
import { getDirecciones } from '../service/direccion.service.jsx';
import { getDatePadres } from '../service/PadreDeFamilia.jsx';
import Toast from '../components/Toast.jsx';
import {getCursos} from '../service/cursos.service.jsx'
import Header from '../components/Header.jsx'

const UserManagementForm = () => {
  const [formData, setFormData] = useState({
    idDireccion: '',
    idPadre: '',
    idCurso: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    numCelular: '',
    fechaDeNacimiento: '',
    contrasenia: '',
    estado: true,
    rol: '',
  });

  const [direcciones, setDirecciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [padres, setPadres] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await getDirecciones();
        setDirecciones(response.data);
      } catch (error) {
        console.error('Error al obtener direcciones:', error);
      }
    };
    fetchDirecciones();
  }, []);

  useEffect(() => {
    const fetchPadres = async () => {
      try {
        const response = await getDatePadres();
        setPadres(response.data);
      } catch (error) {
        console.error('Error al obtener los padres de familia:', error);
      }
    };
    fetchPadres();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await getCursos();
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener los curso:', error);
      }
    };
    fetchCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      switch (formData.rol) {
        case 'Administrador':
          response = await postAdministrador(formData);
          break;
        case 'Profesor':
          response = await postProfesor(formData);
          break;
        case 'Padre de Familia':
          response = await postPadre(formData);
          break;
        case 'Psicologo':
          response = await postPsicologo(formData);
          break;
        case 'Estudiante':
          response = await postEstudiante({
            idPadre: formData.idPadre,
            idCurso: formData.idCurso,
            nombres: formData.nombres.trim(),
            apellidoPaterno: formData.apellidoPaterno.trim(),
            apellidoMaterno: formData.apellidoMaterno.trim(),
            fechaNacimiento: formData.fechaDeNacimiento,
            estado: formData.estado,
            rol: 'Estudiante'
          });
          break;
        default:
          throw new Error('Selecciona un rol válido.');
      }

      setToast({ show: true, message: `Usuario ${formData.rol} creado exitosamente`, type: 'success' });
      setFormData({
        idDireccion: '',
        idPadre: '',
        idCurso: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        numCelular: '',
        fechaDeNacimiento: '',
        contrasenia: '',
        estado: true,
        rol: '',
      });
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.error || 'Error al crear usuario', type: 'error' });
    }
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  return (
    <div className="user-form-container">
      
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <Header title={"Gestion de Usuarios"} subtitle={"Ingresa los datos del usuario para registrarlo"}/>
      <hr />
      <div className="form-group">
        <label>Rol:</label>
        <select name="rol" value={formData.rol} onChange={handleChange} required>
          <option value="">Selecciona un rol</option>
          <option value="Administrador">Administrador</option>
          <option value="Profesor">Profesor</option>
          <option value="Psicologo">Psicólogo</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Padre de Familia">Padre de Familia</option>
        </select>
      </div>

      <UserForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        direcciones={direcciones}
        cursos={cursos}
        padres={padres}
        showPadre={formData.rol === 'Estudiante'}
        showCurso={formData.rol === 'Estudiante'}
        showEmail={formData.rol !== 'Estudiante'}
        showNumCelular={formData.rol !== 'Estudiante'}
        showContrasenia={formData.rol !== 'Estudiante'}
      />
    </div>
  );
};

export default UserManagementForm;
