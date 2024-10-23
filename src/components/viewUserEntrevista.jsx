import React, { useState } from 'react';
import './viewUserEntrevista.css';
import Header from './Header';

const ViewUserEntrevista = () => {
  const [selectedMotivo, setSelectedMotivo] = useState('');

  const handleMotivoChange = (e) => {
    setSelectedMotivo(e.target.value);
  };

  const handleAgendarClick = () => {
    if (selectedMotivo) {
      alert(`Entrevista agendada con motivo: ${selectedMotivo}`);
    } else {
      alert('Por favor, seleccione un motivo antes de agendar.');
    }
  };

  const handleCancelarClick = () => {
    alert('Acción cancelada');
  };

  return (
    <>
    <Header title={"AGENDAR ENTREVISTA"} subtitle={"Agende su entrevista"}/>
    <div className="entrevista-container">
        
      <h2>HORARIO DE ENTREVISTA</h2>
      <table className="entrevista-table">
        <thead>
          <tr>
            <th>Nombre del Profesor</th>
            <th>Materia</th>
            <th>Día</th>
            <th>Horario de entrevista</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pedro Yaniquez Vera</td>
            <td>Lenguaje</td>
            <td>Lunes</td>
            <td>07:10 a 8:10</td>
          </tr>
        </tbody>
      </table>
      <div className="motivo-section">
        <select value={selectedMotivo} onChange={handleMotivoChange}>
          <option value="">Seleccione el motivo</option>
          <option value="Psicológico">Psicológico</option>
          <option value="Académico">Académico</option>
          <option value="Disciplinario">Disciplinario</option>
          <option value="Pedagógico">Pedagógico</option>
          <option value="Consulta">Consulta</option>
        </select>
      </div>
      <div className="button-section">
        <button className="cancel-button" onClick={handleCancelarClick}>Cancelar</button>
        <button className="agendar-button" onClick={handleAgendarClick}>Agendar</button>
      </div>
    </div>
    </>
  );
};

export default ViewUserEntrevista;