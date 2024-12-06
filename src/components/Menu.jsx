import React, { useState, useContext, useEffect } from 'react';
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
  

  useEffect(() => {
    if (user && !['Administrador', 'Profesor', 'Psicologo', 'Padre de Familia'].includes(user.role)) {
      navigate('/unauthorized');
    }
  }, [user, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir al login después del logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownInfo = () => {
    setDropdownInfo(!DropdownInfo);
  };

  const toggleDropdownActas = () => {
    setDropdownActas(!DropdownActas);
  };

  // Verificación de roles
  const isProfesorOrPsicologo = user?.role === 'Profesor' || user?.role === 'Psicologo';
  const isAdministrador = user?.role === 'Administrador';

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

          {/* Esta opción solo se muestra si el rol es Administrador */}
          {isAdministrador && (
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
          )}

          {/* Gestión de Usuarios solo para Administrador */}
          {isAdministrador && (
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
          )}

          {isDropdownOpen && isAdministrador && (
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
                <Link to="/ingresos" className="sidebar-link">
                  Control de ingresos
                  <i className="Icon-container-menu">
                    <img src={userIcon} alt='Control de Ingresos' />
                  </i>
                </Link>
              </li>
            </ul>
          )}

          {/* Gestión de Informes solo para Administrador */}
          {isAdministrador && (
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
          )}

          {DropdownInfo && isAdministrador && (
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


          {isProfesorOrPsicologo && (
            <li>
              <div className='sidebar-container'>
                <Link to="/psicologoHome" className="sidebar-link">
                  Inicio
                  <i className='Icon-container-menu'>
                    <img src={iconHome} alt='Home' />
                  </i>
                </Link>
              </div>
            </li>
          )}
          {isProfesorOrPsicologo && (
            <li>
              <div className='sidebar-container'>
                <Link to="/listaEntrevistas" className="sidebar-link">
                  Entrevistas
                  <i className='Icon-container-menu'>
                    <img src={iconHome} alt='Home' />
                  </i>
                </Link>
              </div>
            </li>
          )}



          {/* Gestión de Actas solo para Profesor o Psicologo */}
          {isProfesorOrPsicologo && (
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
          )}



          {DropdownActas && isProfesorOrPsicologo && (
            <ul className="dropdown">
              <li className='sidebar-container'>
                <Link to="/crearActa" className="sidebar-link">
                  Crear Acta
                </Link>
              </li>
             
              <li className='sidebar-container'>
                <Link to="/editarActa" className="sidebar-link">
                  Editar una acta
                </Link>
              </li>
              <li className='sidebar-container'>
                <Link to="/eliminaracta" className="sidebar-link">
                  Eliminar acta
                </Link>
              </li>
              <li className='sidebar-container'>
                <Link to="/psicologoListPadres" className="sidebar-link">
                  Citar a Padres
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
