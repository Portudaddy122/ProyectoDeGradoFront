import React from 'react';
import './UserMenu.css';

const UserMenu = () => {
  return (
    <nav className="user-menu">
      <ul className="menu-list">
        <li className="menu-item">Inicio</li>
        <li className="menu-item">Agendar entrevista</li>
        <li className="menu-item">Lista de profesores</li>
        <li className="menu-item">Contacto</li>
        <li className="menu-item">Historial de citas</li>
        <li className="menu-item">Preguntas frecuentes</li>
        <li className="menu-item">
          <span className="user-icon">&#128100;</span> Cerrar Sesión
        </li>
      </ul>
    </nav>
  );
};

export default UserMenu;
