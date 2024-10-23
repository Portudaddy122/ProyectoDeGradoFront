// UserForm.jsx
import React from 'react';
import './UserForm.css'; 

const UserForm = ({ formData, handleChange, handleSubmit, direcciones, showCurso, cursos, padres, showPadre, showEmail, showNumCelular, showContrasenia }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombres:</label>
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          required
          placeholder="Ingrese sus nombres"
        />
      </div>

      <div className="form-group">
        <label>Apellido Paterno:</label>
        <input
          type="text"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          required
          placeholder="Ingrese su apellido paterno"
        />
      </div>

      <div className="form-group">
        <label>Apellido Materno:</label>
        <input
          type="text"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          required
          placeholder="Ingrese su apellido materno"
        />
      </div>

      <div className="form-group">
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaDeNacimiento"
          value={formData.fechaDeNacimiento}
          onChange={handleChange}
          required
          placeholder="Ingrese su fecha de nacimiento"
        />
      </div>

      {/* Mostrar campo de dirección solo si no es Estudiante */}
      {direcciones && (
        <div className="form-group">
          <label>Dirección:</label>
          <select
            name="idDireccion"
            value={formData.idDireccion}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una dirección</option>
            {direcciones.map((direccion) => (
              <option key={direccion.iddireccion} value={direccion.iddireccion}>
                {direccion.zona} - {direccion.calle} - {direccion.num_puerta}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mostrar campo de Padre si se solicita */}
      {showPadre && (
        <div className="form-group">
          <label>Padre de Familia:</label>
          <select
            name="idPadre"
            value={formData.idPadre}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un padre</option>
            {padres.map((padre) => (
              <option key={padre.idpadre} value={padre.idpadre}>
                {padre.nombres} {padre.apellidopaterno} {padre.apellidomaterno}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Mostrar campo de Curso solo si es Estudiante */}
      {showCurso && (
        <div className="form-group">
          <label>ID Curso:</label>
          <select
            name="idCurso"
            value={formData.idCurso}
            onChange={handleChange}
            required
          >
           <option value="">Selecciona un curso</option>
            {cursos.map((curso) => (
              <option key={curso.idcurso} value={curso.idcurso}>
                {curso.nombrecurso} {curso.paralelo} de {curso.nivel}
              </option>
            ))}
            </select>

        </div>
      )}

      {/* Mostrar campos Email, Celular y Contraseña solo si no es Estudiante */}
      {showEmail && (
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ingrese su correo electrónico"
          />
        </div>
      )}

      {showNumCelular && (
        <div className="form-group">
          <label>Número de Celular:</label>
          <input
            type="text"
            name="numCelular"
            value={formData.numCelular}
            onChange={handleChange}
            required
            placeholder="Ingrese su número de celular"
          />
        </div>
      )}

      {showContrasenia && (
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasenia"
            value={formData.contrasenia}
            onChange={handleChange}
            required
            placeholder="Ingrese su contraseña"
          />
        </div>
      )}

      <button type="submit">Crear Usuario</button>
    </form>
  );
};

export default UserForm;
