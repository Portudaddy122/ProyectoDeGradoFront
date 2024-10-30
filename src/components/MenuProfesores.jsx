import React, { useContext, useState } from 'react';
import './MenuProfesores.css';
import { FaHome, FaUserGraduate, FaFileAlt, FaPlus, FaEdit, FaTrash, FaCog, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import rowIcon from '../assets/icons/Vector.svg';
import AuthContext from '../auth';

const MenuProfesores = () => {
  // Asegúrate de que useContext esté dentro del componente funcional
  const { user } = useContext(AuthContext); 
  const [isActasDropdownOpen, setIsActasDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleActasDropdown = () => {
    setIsActasDropdownOpen(!isActasDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        <FaBars />
      </button>

      <div className={`sidebar ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className='Img-container'>
          <img src={logo} alt="IDEB Logo" className="logo" />
        </div>
        <h2 className="sidebar-title">IDEB SISTEMA ESCOLAR</h2>

        <ul className="sidebar-menu">
          <div className='hr-barra'>
            <hr />
          </div>

          {/* Enlace de Inicio */}
          <li>
            <div className='sidebar-container'>
              <Link to="/profesor/home" className="sidebar-link">
                <FaHome className="menu-icon" />
                Inicio
              </Link>
            </div>
          </li>

          {/* Gestión de Actas - Dropdown */}
          {'Psicologo'.includes(user.role) && (
            <>
              <li>
                <div className='sidebar-container' onClick={toggleActasDropdown}>
                  <div className="sidebar-link">
                    <FaFileAlt className="menu-icon" />
                    Gestión de actas
                    <i className={`dropdown-arrow ${isActasDropdownOpen ? 'open' : ''}`}>
                      <img src={rowIcon} alt='Dropdown' />
                    </i>
                  </div>
                </div>
              </li>

              {isActasDropdownOpen && (
                <ul className="dropdown">
                  <li className='sidebar-container'>
                    <Link to="/crearActa" className="sidebar-link">
                      <FaPlus className="menu-icon" />
                      Crear nueva acta
                    </Link>
                  </li>
                  <li className='sidebar-container'>
                    <Link to="/editaracta" className="sidebar-link">
                      <FaEdit className="menu-icon" />
                      Editar una acta
                    </Link>
                  </li>
                  <li className='sidebar-container'>
                    <Link to="/eliminaracta" className="sidebar-link">
                      <FaTrash className="menu-icon" />
                      Eliminar acta
                    </Link>
                  </li>
                </ul>
              )}
            </>
          )}

          {/* Otras opciones */}
          <li>
            <div className='sidebar-container'>
              <Link to="/configuraciones" className="sidebar-link">
                <FaCog className="menu-icon" />
                Configuraciones
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuProfesores;
