import React, { useState, useEffect } from 'react';
import './UserForm.css';
import { postAdministrador } from '../service/administrador.service.jsx';  
import { postPadre } from '../service/PadreDeFamilia.jsx';
import { postProfesor } from '../service/profesor.service.jsx';
import { getDirecciones } from '../service/direccion.service.jsx'; // Importa tu servicio para direcciones

const UserForm = () => {
  const [formData, setFormData] = useState({
    idDireccion: '',
    nombres: '',
    apellido_Paterno: '',
    apellido_Materno: '',
    rol: '',
    email: '',
    num_celular: '',
    fecha_de_nacimiento: '',
    contrasenia: ''
  });

  const [direcciones, setDirecciones] = useState([]); // Estado para las direcciones

  // Cargar direcciones al montar el componente
  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        const response = await getDirecciones();
        console.log(response);
        
        setDirecciones(response.data); // Asumiendo que las direcciones vienen en response.data
      } catch (error) {
        console.error('Error al cargar direcciones:', error);
      }
    };

    fetchDirecciones();
  }, []);

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setFormData({ ...formData, rol: selectedRole });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response;


    try {
      if (formData.rol === 'Profesor') {
        console.log(formData);
        response = await postProfesor(formData);
      } else if (formData.rol === 'Administrador') {
        response = await postAdministrador(formData);
      } else if (formData.rol === 'Padre de Familia') {
        response = await postPadre(formData);
      }

      if (!response) {
        throw new Error('Rol no válido o no manejado');
      }

      console.log('Usuario creado:', response.data);
      // Limpiar el formulario
      setFormData({
        idDireccion: '',
        nombres: '',
        apellido_Paterno: '',
        apellido_Materno: '',
        rol: '',
        email: '',
        num_celular: '',
        fecha_de_nacimiento: '',
        contrasenia: ''
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message, stack: err.stack });
  }
  
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>
        Nombres:
        <input
          type="text"
          placeholder="Escriba los nombres del usuario"
          value={formData.nombres}
          onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
        />
      </label>
      
      <label>
        Apellido Paterno:
        <input
          type="text"
          placeholder="Escriba el apellido paterno"
          value={formData.apellido_Paterno}
          onChange={(e) => setFormData({ ...formData, apellido_Paterno: e.target.value })}
        />
      </label>
      
      <label>
        Apellido Materno:
        <input
          type="text"
          placeholder="Escriba el apellido materno"
          value={formData.apellido_Materno}
          onChange={(e) => setFormData({ ...formData, apellido_Materno: e.target.value })}
        />
      </label>

      <label>
        Rol:
        <select
          value={formData.rol}
          onChange={handleRoleChange}
        >
          <option value="">Selecciona el rol</option>
          <option value="Profesor">Profesor</option>
          <option value="Psicologo">Psicólogo</option>
          <option value="Administrador">Administrador</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Padre de Familia">Padre de Familia</option>
        </select>
      </label>

      <label>
        Dirección:
        <select
          value={formData.idDireccion}
          onChange={(e) => setFormData({ ...formData, idDireccion: e.target.value })}
        >
          <option>Selecciona una dirección</option>
          {direcciones.map(direccion => (
            <option key={direccion.iddireccion} value={direccion.iddireccion}>
              {[direccion.iddireccion,direccion.zona ]} {/* Ajusta según la propiedad que contenga la dirección */}
            </option>
          ))}
        </select>
      </label>

      <label>
        Correo:
        <input
          type="email"
          placeholder="Escriba el correo del usuario"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>

      <label>
        Numero de Celular:
        <input
          type="text"
          placeholder="Escriba el numero de celular del usuario"
          value={formData.num_celular}
          onChange={(e) => setFormData({ ...formData, num_celular: e.target.value })}
        />
      </label>

      <label>
        Fecha de Nacimiento:
        <input
          type="date"
          value={formData.fecha_de_nacimiento}
          onChange={(e) => setFormData({ ...formData, fecha_de_nacimiento: e.target.value })}
        />
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          placeholder="Escriba la contraseña del usuario"
          value={formData.contrasenia}
          onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
        />
      </label>

      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default UserForm;
