import React, { useState } from 'react';
import './Menu.css';
import ListBtnIcons from './ListBtnIcons';
import list from '../assets/icons/list.svg'
import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo.svg';
import iconHome from '../assets/icons/home-2.svg';
import userIcon from '../assets/icons/user.svg';
import rowIcon from '../assets/icons/Vector.svg';

const Menu = () => {
  return (
    <>

<div className="sidebar">
            <div className='Img-container'>
              <img src={logo} alt='Loguito'/>
            </div>
            <h2 className="sidebar-title">IDEB SISTEMA ESCOLAR</h2>
            <ul className="sidebar-menu">
            <div className='hr-barra'>
              <hr/>
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
                  <div className="sidebar-link">

                    Gestion de Usuarios
                        <i className="Icon-container-menu">
                        <img src={rowIcon} alt='Home' />
                          </i> 
        
                    </div>
                    </div>
                </li>



                <li>
                <div className='sidebar-container'>
                    <Link to="/listar" className="sidebar-link">
                    Listar Usuarios
                        <i className="Icon-container-menu">
                        <img src={userIcon} alt='Home' />
                          </i> 
                    </Link>
                    </div>
                </li>

                <li>
                <div className='sidebar-container'>
                    <Link to="/agregar" className="sidebar-link">
                    Agregar nuevo Usuario
                        <i className="Icon-container-menu">
                        <img src={userIcon} alt='Home' />
                          </i> 
                    </Link>
                    </div>
                </li>

                <li>
                <div className='sidebar-container'>
                    <Link to="/editar" className="sidebar-link">
                    Editar un Usuario
                        <i className="Icon-container-menu">
                        <img src={userIcon} alt='Home' />
                          </i> 
                    </Link>
                    </div>
                </li>


                <li>
                <div className='sidebar-container'>
                    <Link to="/categorias" className="sidebar-link">
                    Control de ingresos
                        <i className="Icon-container-menu">
                        <img src={userIcon} alt='Home' />
                          </i> 
                    </Link>
                    </div>
                </li>

            </ul>
        </div>
    </>
  );
};

export default Menu;
