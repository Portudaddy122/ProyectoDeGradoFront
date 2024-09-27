import React, { useState } from 'react';
import './Menu.css';
import ListBtnIcons from './ListBtnIcons';
import list from '../assets/icons/list.svg'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className={`menu-container ${isOpen ? 'open' : ''}`}>
        <section className='menu-container-top'>
          <div className='menu-image'></div>
          <p>IDEB SISTEMA ESCOLAR</p>
        </section>

        <section className='menu-container-bottom'>
          <ListBtnIcons />
        </section>
      </section>

      {/* Botón para mostrar/ocultar el menú */}
      <button className='menu-button' onClick={toggleMenu}>
      <img src={list} alt='Menu' />

      </button>
    </>
  );
};

export default Menu;
