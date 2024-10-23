import React, { useState, useContext } from 'react';
import './Menu.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import iconHome from '../assets/icons/home-2.svg';
import userIcon from '../assets/icons/user.svg';
import rowIcon from '../assets/icons/Vector.svg';
import iconInfo from '../assets/icons/File.svg';
import AuthContext from '../auth.jsx';  // Importa el contexto de autenticación

const Menu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [DropdownInfo, setDropdownInfo] = useState(false);
  const [DropdownActas, setDropdownActas] = useState(false);




  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después del logout
  };


  // Verificar si el usuario no es administrador
  if (user?.role !== 'Administrador') {
    // Si no es administrador, redirige a la página no autorizada
    navigate('/unauthorized');
    return null; // No renderizamos el menú si no es administrador
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownInfo = () => {
    setDropdownInfo(!DropdownInfo);
  };

  const toggleDropdownActas = () => {
    setDropdownActas(!DropdownActas);
  };

  return (
    <>
      <div className="sidebar">
        <div className='Img-container'>
          <img src={logo} alt='Loguito' />
        </div>
        <h2 className="sidebar-title">IDEB SISTEMA ESCOLAR</h2>
        <ul className="sidebar-menu">
          <div className='hr-barra'>
            <hr />
          </div>

          <li>
            <div className='sidebar-container'>
              <Link to="/" className="sidebar-link">
                Inicio
                <i className='Icon-container-menu'>
                  <img src={iconHome} alt='Home' />
                </i>
              </Link>
            </div>
          </li>

          <li>
            <div className='sidebar-container'>
              <div className="sidebar-link" onClick={toggleDropdown}>
                Gestión de Usuarios
                <i className={`Icon-container-menu ${isDropdownOpen ? 'rotate' : ''}`}>
                  <img src={rowIcon} alt='Dropdown' />
                </i>
              </div>
            </div>
          </li>

          {isDropdownOpen && (
            <ul className="dropdown">
              <li className='sidebar-container'>
                <Link to="/listar" className="sidebar-link">
                  Listar Usuarios
                  <i className="Icon-container-menu">
                    <img src={userIcon} alt='Listar Usuarios' />
                  </i>
                </Link>
              </li>

              <li className='sidebar-container'>
                <Link to="/agregar" className="sidebar-link">
                  Agregar nuevo Usuario
                  <i className="Icon-container-menu">
                    <img src={userIcon} alt='Agregar Usuario' />
                  </i>
                </Link>
              </li>

              <li className='sidebar-container'>
                <Link to="/editar" className="sidebar-link">
                  Editar un Usuario
                  <i className="Icon-container-menu">
                    <img src={userIcon} alt='Editar Usuario' />
                  </i>
                </Link>
              </li>

              <li className='sidebar-container'>
                <Link to="/categorias" className="sidebar-link">
                  Control de ingresos
                  <i className="Icon-container-menu">
                    <img src={userIcon} alt='Control de Ingresos' />
                  </i>
                </Link>
              </li>
            </ul>
          )}

          <li>
            <div className='sidebar-container'>
              <div className="sidebar-link" onClick={toggleDropdownInfo}>
                Gestión de Informes
                <i className={`Icon-container-menu ${DropdownInfo ? 'rotate' : ''}`}>
                  <img src={rowIcon} alt='Dropdown' />
                </i>
              </div>
            </div>
          </li>

          {DropdownInfo && (
            <ul className="dropdown">
              <li className='sidebar-container'>
                <Link to="/categorias" className="sidebar-link">
                  Listar Informes
                  <i className="Icon-container-menu">
                    <img src={iconInfo} alt='Listar Informes' />
                  </i>
                </Link>
              </li>
            </ul>
          )}

          <li>
            <div className='sidebar-container'>
              <div className="sidebar-link" onClick={toggleDropdownActas}>
                Gestión de Actas
                <i className={`Icon-container-menu ${DropdownActas ? 'rotate' : ''}`}>
                  <img src={rowIcon} alt='Dropdown' />
                </i>
              </div>
            </div>
          </li>

          {DropdownActas && (
            <ul className="dropdown">
              <li className='sidebar-container'>
                <Link to="/" className="sidebar-link">
                  Listar Actas
                  <i className="Icon-container-menu">
                    <img src={iconInfo} alt='Listar Actas' />
                  </i>
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </>
  );
};

export default Menu;
