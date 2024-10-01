import React, { useState, useEffect } from 'react';
import './UserTable.css';
import BtnActionsText from './botones/BtnActionsText';
import { getUserById, updateUser, deleteUser, getUsuarios } from '../service/users.service.jsx';
import DynamicModelForUsers from './DynamicModelForUsers.jsx';

function UserTable() {
    const [users, setUsers] = useState([]); // Estado para usuarios
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Cargar usuarios al montar el componente
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getUsuarios();
            setUsers(response.data); // Asignar los usuarios a estado
        };
        fetchUsers();
    }, []);

    const handleView = async (userId) => {
        const response = await getUserById(userId);
        setSelectedUser(response.data); // Guardar el usuario seleccionado para ver
        setIsViewModalOpen(true); // Abrir modal de ver
    };

    // Función para editar un usuario
    const handleEdit = async (userId) => {
        const response = await getUserById(userId);
        const user = response.data;

        setSelectedUser(user);
        setFormData({
            nombres: user.nombres || '',
            apellidoPaterno: user.apellido_paterno || '',
            apellidoMaterno: user.apellido_materno || '',
            email: user.email || '',
            rol: user.rol || '',
            numCelular: user.num_celular || '',
            fechaNacimiento: user.fecha_de_nacimiento || ''
        });
        setIsModalOpen(true);
    };

    // Función para eliminar un usuario (cambiar su estado a false)
    const handleDelete = (userId) => {
        const user = users.find(user => user.idpersona === userId); // Obtener el usuario a eliminar
        setSelectedUser(user); // Guardar el usuario seleccionado
        setIsDeleteModalOpen(true);  // Abrir el modal de confirmación de eliminación
    };

    // Acción para manejar la actualización de usuario
    const handleUpdateUser = async (updatedUser) => {
        const updatedUsers = users.map(user =>
            user.idpersona === updatedUser.idpersona ? updatedUser : user
        );
        setUsers(updatedUsers); // Actualizar la lista de usuarios en el estado
    };

    // Acción para eliminar el usuario
    const confirmDeleteUser = async () => {
        if (selectedUser) {
            const updatedData = { ...selectedUser, estado: false }; // Cambiar estado a false
            await updateUser(selectedUser.idpersona, updatedData);
            setUsers(users.filter(user => user.idpersona !== selectedUser.idpersona)); // Eliminar del estado
        }
        setIsDeleteModalOpen(false); // Cerrar el modal de confirmación
    };

    let actions = [
        {
            color: 'green',
            text: 'Ver',
            handler: handleView // Asigna la función para ver
        },
    ];

    if (location.pathname === '/editar')
        actions = [
            {
                color: 'green',
                text: 'Ver',
                handler: handleView
            },
            {
                color: 'yellow',
                text: 'Editar',
                handler: handleEdit
            },
            {
                color: 'red',
                text: 'Eliminar',
                handler: handleDelete
            }
        ];

    return (
        <section className='user-table-container'>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th>Apellido Paterno</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nombres}</td>
                            <td>{user.apellido_paterno}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <section className='btn-actions'>
                                    {actions.map((action, idx) => (
                                        <BtnActionsText
                                            key={idx}
                                            color={action.color}
                                            text={action.text}
                                            onClick={() => action.handler(user.idpersona)} // Pasar el ID del usuario
                                        />
                                    ))}
                                </section>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para editar el usuario */}
            <DynamicModelForUsers
                isOpen={isModalOpen}
                title="Editar Usuario"
                content={selectedUser && (
                    <form>
                        <label className='modal-label'>Nombres:</label>
                        <input className='modal-input'
                            type="text"
                            value={formData.nombres || ''}
                            onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                        />
                        <label className='modal-label'>Apellido Paterno:</label>
                        <input className='modal-input'
                            type="text"
                            value={formData.apellidoPaterno || ''}
                            onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
                        />
                        <label className='modal-label'>Apellido Materno:</label>
                        <input className='modal-input'
                            type="text"
                            value={formData.apellidoMaterno || ''}
                            onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
                        />
                        <label className='modal-label'>Email:</label>
                        <input className='modal-input'
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <label className='modal-label'>Rol:</label>
                        <select
                            value={formData.rol || ''}
                            onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="Profesor">Profesor</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Psicologo">Psicologo</option>
                            <option value="Padre de Familia">Padre de Familia</option>
                        </select>
                        <label className='modal-label'>Número de Celular:</label>
                        <input className='modal-input'
                            type="text"
                            value={formData.numCelular || ''}
                            onChange={(e) => setFormData({ ...formData, numCelular: e.target.value })}
                        />
                        <label className='modal-label'>Fecha de Nacimiento:</label>
                        <input className='modal-input'
                            type="date"
                            value={formData.fechaNacimiento || ''}
                            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                        />
                    </form>
                )}
                onSave={() => {
                    if (selectedUser) {
                        // Formatear la fecha
                        const formatDate = (date) => {
                            const d = new Date(date);
                            return d.toISOString().split('T')[0]; // Formato YYYY-MM-DD
                        };

                        // Crear objeto para actualizar
                        const updatedData = {
                            iddireccion: formData.iddireccion || selectedUser.iddireccion,
                            nombres: formData.nombres,
                            apellido_paterno: formData.apellidoPaterno,
                            apellido_materno: formData.apellidoMaterno,
                            email: formData.email,
                            rol: formData.rol,
                            num_celular: formData.numCelular,
                            fecha_de_nacimiento: formatDate(formData.fechaNacimiento) // Asegúrate de que esto sea YYYY-MM-DD
                        };

                        updateUser(selectedUser.idpersona, updatedData) // Intentar actualizar el usuario
                            .then(response => {
                                console.log("Usuario actualizado con éxito", response);
                                handleUpdateUser(response.data);
                            })
                            .catch(error => {
                                console.error("Error actualizando el usuario", error.response.data);
                            });
                    }

                    setIsModalOpen(false); // Cerrar el modal después de guardar
                }}
                onCancel={() => setIsModalOpen(false)} // Cerrar el modal al cancelar
                isEdit={true}
            />

            {/* Modal para ver los datos del usuario */}
            {selectedUser && (
                <DynamicModelForUsers
                    isOpen={isViewModalOpen}
                    title="Detalles del Usuario"
                    content={
                        <div>
                            <p><strong>Nombres:</strong> {selectedUser.nombres}</p>
                            <p><strong>Apellido Paterno:</strong> {selectedUser.apellido_paterno}</p>
                            <p><strong>Apellido Materno:</strong> {selectedUser.apellido_materno}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Rol:</strong> {selectedUser.rol}</p>
                            <p><strong>Número de Celular:</strong> {selectedUser.num_celular}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {selectedUser.fecha_de_nacimiento}</p>
                        </div>
                    }
                    onClose={() => setIsViewModalOpen(false)} // Cerrar modal al cancelar
                    isEdit={false} // No es un modal de edición
                />
            )}

            {/* Modal de confirmación para eliminar */}
            <DynamicModelForUsers
                isOpen={isDeleteModalOpen}
                title="Eliminar Usuario"
                content={
                    <div>
                        <p>¿Estás seguro de que deseas eliminar a {selectedUser?.nombres}?</p>
                    </div>
                }
                onSave={confirmDeleteUser} // Confirmar eliminación
                onCancel={() => setIsDeleteModalOpen(false)} // Cerrar el modal al cancelar
                isEdit={false} // No es un modal de edición
            />
        </section>
    );
}

export default UserTable;
