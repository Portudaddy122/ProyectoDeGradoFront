import React from 'react';
import './FormActas.css'; // Assuming you have a CSS file for styling

function FormActas() {
  return (
    <div className="form-container">
      <div className="student-info">
        <label htmlFor="studentName">Nombre del estudiante</label>
        <input
          type="text"
          id="studentName"
          value="Roberto Gabriel Portugal Jimenez"
          className="student-input"
          readOnly
        />
      </div>

      <h2>Creacion de nueva acta</h2>

      <div className="acta-form">
        <div className="form-group">
          <label htmlFor="motivo">Motivo</label>
          <select id="motivo" className="form-select">
            <option value="">Selecciona el motivo</option>
            <option value="motivo1">Motivo 1</option>
            <option value="motivo2">Motivo 2</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="materia">Materia</label>
          <select id="materia" className="form-select">
            <option value="">Selecciona la materia</option>
            <option value="matematica">Matemática</option>
            <option value="fisica">Física</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input type="date" id="fecha" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            id="descripcion"
            className="form-textarea"
            placeholder="Ingrese la descripcion de la entrevista"
          ></textarea>
        </div>
      </div>

      <div className="actions">
        <button className="action-button limpiar-button">Limpiar</button>
        <button className="action-button crear-button">Crear</button>
      </div>
    </div>
  );
}

export default FormActas;

