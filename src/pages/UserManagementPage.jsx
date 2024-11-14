import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import './UserManagementHome.css';
import SearchBar from '../components/SearchBar.jsx';
import UserTable from '../components/UserTable.jsx';
import ExportActions from '../components/ExportActions.jsx';
import Header from '../components/Header.jsx';
import './UserManagementPage.css';
import Toast from '../components/Toast';
import DynamicModelForUsers from '../components/DynamicModelForUsers.jsx';
import { getUsuarios, filterUsuarios } from '../service/users.service.jsx';
import { getProfesorById, deleteProfesor, putProfesor } from '../service/profesor.service.jsx';
import { getAdministradorById, deleteAdministrador, putAdministrador } from '../service/administrador.service.jsx';
import { getPadreById, deletePadre, putPadre, getPadre } from '../service/PadreDeFamilia.jsx';
import { getDirecciones } from '../service/direccion.service.jsx';
import { getEstudianteById, putEstudiante, deleteEstudiante } from '../service/Estudiante.service.jsx';
import { getPsicologoById, deletePsicologo, putPsicologo } from '../service/psicologo.service.jsx';
import {getCursos, getCursosById} from '../service/cursos.service.jsx'
import { Padding } from '@mui/icons-material';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [direcciones, setDirecciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [curso, setCurso] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchUsers();
    fetchDirecciones();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsuarios();
    setUsers(response.data);
    setFilteredUsers(response.data);
  };

  const fetchDirecciones = async () => {
    const response = await getDirecciones();
    setDirecciones(response.data);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      try {
        const response = await filterUsuarios(searchTerm);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error al filtrar usuarios:', error);
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };

  const handleView = async (user) => {
    let response;
    try {
      if (user.rol === 'Profesor') {
        response = await getProfesorById(user.id);
      } else if (user.rol === 'Administrador') {
        response = await getAdministradorById(user.id);
      } else if (user.rol === 'Padre de Familia') {
        response = await getPadreById(user.id);
      } else if (user.rol === 'Estudiante') {
        response = await getEstudianteById(user.id);
        const cursoResponse = await getCursosById(response.data.idcurso);
        setCurso(cursoResponse.data);
      } else if (user.rol === 'Psicologo') {
        response = await getPsicologoById(user.id);
      }

      setSelectedUser({ ...response.data, id: user.id });
      setIsViewModalOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  const handleEdit = async (user) => {
    let response;
    try {
      if (user.rol === 'Profesor') {
        response = await getProfesorById(user.id);
      } else if (user.rol === 'Administrador') {
        response = await getAdministradorById(user.id);
      } else if (user.rol === 'Padre de Familia') {
        response = await getPadreById(user.id);
      } else if (user.rol === 'Estudiante') {
        response = await getEstudianteById(user.id);
        const cursoResponse = await getCursosById(response.data.idcurso);
        setCurso(cursoResponse.data);
      } else if (user.rol === 'Psicologo') {
        response = await getPsicologoById(user.id);
      }

      setSelectedUser({ ...response.data, id: user.id });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles del usuario para editar:', error);
    }
  };

  const saveEditedUser = async () => {
    const updatedFields = {};

    // Asegúrate de que estos campos se incluyan solo si existen y son válidos
    if (selectedUser.nombres && selectedUser.nombres.trim() !== "") {
        updatedFields.nombres = selectedUser.nombres.trim();
    }
    if (selectedUser.apellidopaterno && selectedUser.apellidopaterno.trim() !== "") {
        updatedFields.apellidopaterno = selectedUser.apellidopaterno.trim();
    }
    if (selectedUser.apellidomaterno && selectedUser.apellidomaterno.trim() !== "") {
        updatedFields.apellidomaterno = selectedUser.apellidomaterno.trim();
    }
    if (selectedUser.fechaDeNacimiento) {
        updatedFields.fechaDeNacimiento = selectedUser.fechaDeNacimiento.slice(0, 10);
    }

    // Asegúrate de que se están enviando los campos idPadre y idCurso
    if (selectedUser.idPadre) {
        updatedFields.idPadre = selectedUser.idPadre;
    } else {
        console.error("Falta idPadre en los datos del formulario");
    }
    if (selectedUser.idCurso) {
        updatedFields.idCurso = selectedUser.idCurso;
    } else {
        console.error("Falta idCurso en los datos del formulario");
    }

    // Estado y Rol siempre enviados
    updatedFields.estado = selectedUser.estado;
    updatedFields.rol = selectedUser.rol;

    console.log("Datos enviados para actualizar el estudiante:", updatedFields); 

    try {
        if (selectedUser.rol === 'Estudiante') {
            await putEstudiante(selectedUser.id, updatedFields);
        }
        showToast('Usuario actualizado exitosamente', 'success');
        fetchUsers();
    } catch (error) {
        console.error('Error al actualizar usuario:', error.response?.data || error.message);
        showToast(error.response?.data?.error || 'Error al actualizar usuario', 'error');
    }
    setIsModalOpen(false);
};



  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      if (selectedUser.rol === 'Profesor') {
        await deleteProfesor(selectedUser.id);
      } else if (selectedUser.rol === 'Administrador') {
        await deleteAdministrador(selectedUser.id);
      } else if (selectedUser.rol === 'Padre de Familia') {
        await deletePadre(selectedUser.id);
      } else if (selectedUser.rol === 'Estudiante') {
        await deleteEstudiante(selectedUser.id);
      } else if (selectedUser.rol === 'Psicologo') {
        await deletePsicologo(selectedUser.id);
      }
      showToast('Usuario eliminado exitosamente', 'success');
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
    setIsDeleteModalOpen(false);
  };

  const isEditMode = location.pathname.includes('/editar');

  return (
    <>
    <Header title={'GESTIÓN DE USUARIOS'} subtitle={'Listado de usuarios del sistema'} />
      <section className='user-management-container'>
        
        <section className='user-management-search-export-container'>
        
          
        </section>
        <UserTable
  users={filteredUsers}
  onView={handleView}
  onEdit={isEditMode ? handleEdit : null}
  onDelete={isEditMode ? handleDelete : null}
  exportTitle="Listado de Usuarios del Sistema"
/>

        {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

        {/* Modal para ver datos */}
        <DynamicModelForUsers
          isOpen={isViewModalOpen}
          title={`Visualizar ${selectedUser?.rol}`}
          content={selectedUser && (
            <div>
              {selectedUser.rol === 'Estudiante' ? (
                <>
                  <p><strong>Padre de Familia:</strong> {selectedUser.nombres} {selectedUser.apellidopaterno} {selectedUser.apellidomaterno} </p>
                  <p><strong>Curso:</strong> {curso ? `${curso.nombrecurso} ${curso.paralelo} - ${curso.nivel}` : 'Cargando...'}</p>
                  <p><strong>Nombres:</strong> {selectedUser.nombres}</p>
                  <p><strong>Apellido Paterno:</strong> {selectedUser.apellidopaterno}</p>
                  <p><strong>Apellido Materno:</strong> {selectedUser.apellidomaterno}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {selectedUser.fechanacimiento}</p>
                  <p><strong>Rol:</strong> {selectedUser.rol}</p>
                </>
              ) : (
                <>
                  <p><strong>Nombre:</strong> {selectedUser.nombres}</p>
                  <p><strong>Apellido Paterno:</strong> {selectedUser.apellidopaterno}</p>
                  <p><strong>Apellido Materno:</strong> {selectedUser.apellidomaterno}</p>
                  <p><strong>Correo:</strong> {selectedUser.email}</p>
                  <p><strong>Número Celular:</strong> {selectedUser.numcelular}</p>
                  <p><strong>Fecha de Nacimiento:</strong> {selectedUser.fechadenacimiento}</p>
                  <p><strong>Rol:</strong> {selectedUser.rol}</p>
                </>
              )}
            </div>
          )}
          onClose={() => setIsViewModalOpen(false)}
        />

        {/* Modal para editar datos */}
        <DynamicModelForUsers
          isOpen={isModalOpen}
          title={`Editar ${selectedUser?.rol}`}
          content={selectedUser && (
            <form>
              {selectedUser.rol === 'Estudiante' ? (
                <>

                
                  <label>ID Padre:</label>
                  <input
                    type="text"
                    value={selectedUser.idpadre || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, idpadre: e.target.value })}
                  />
                  <label>ID Curso:</label>
                  <input
                    type="text"
                    value={selectedUser.idcurso || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, idcurso: e.target.value })}
                  />
                  <label>Nombres:</label>
                  <input
                    type="text"
                    value={selectedUser.nombres || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, nombres: e.target.value })}
                  />
                  <label>Apellido Paterno:</label>
                  <input
                    type="text"
                    value={selectedUser.apellidopaterno || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, apellidopaterno: e.target.value })}
                  />
                  <label>Apellido Materno:</label>
                  <input
                    type="text"
                    value={selectedUser.apellidomaterno || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, apellidomaterno: e.target.value })}
                  />
                  <label>Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    value={selectedUser.fechanacimiento ? selectedUser.fechanacimiento.slice(0, 10) : ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, fechanacimiento: e.target.value })}
                  />
                </>
              ) : (
                <>
                  <label>Nombres:</label>
                  <input
                    type="text"
                    value={selectedUser.nombres || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, nombres: e.target.value })}
                  />
                  <label>Apellido Paterno:</label>
                  <input
                    type="text"
                    value={selectedUser.apellidopaterno || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, apellidopaterno: e.target.value })}
                  />
                  <label>Apellido Materno:</label>
                  <input
                    type="text"
                    value={selectedUser.apellidomaterno || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, apellidomaterno: e.target.value })}
                  />
                  <label>Correo:</label>
                  <input
                    type="email"
                    value={selectedUser.email || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                  <label>Número Celular:</label>
                  <input
                    type="text"
                    value={selectedUser.numcelular || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, numcelular: e.target.value })}
                  />
                  <label>Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    value={selectedUser.fechadenacimiento ? selectedUser.fechadenacimiento.slice(0, 10) : ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, fechadenacimiento: e.target.value })}
                  />
                  <label>Dirección:</label>
                  <select
                    value={selectedUser.iddireccion || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, iddireccion: e.target.value })}
                  >
                    <option value="">Selecciona una dirección</option>
                    {direcciones.map((direccion) => (
                      <option key={direccion.iddireccion} value={direccion.iddireccion}>
                        {direccion.zona} - {direccion.calle} - {direccion.num_puerta}
                      </option>
                    ))}
                  </select>
                  <label>Contraseña:</label>
                  <input
                    type="text"
                    value={selectedUser.contrasenia || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, contrasenia: e.target.value })}
                  />
                </>
              )}
            </form>
          )}
          onSave={saveEditedUser}
          onCancel={() => setIsModalOpen(false)}
        />

        {/* Modal para confirmar eliminación */}
        <DynamicModelForUsers
          isOpen={isDeleteModalOpen}
          title="Eliminar Usuario"
          content={
            <div>
              <p>¿Está seguro de que desea eliminar a {selectedUser?.nombres}?</p>
            </div>
          }
          onConfirm={confirmDeleteUser}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </section>
    </>
  );
};

export default UserManagementPage;
