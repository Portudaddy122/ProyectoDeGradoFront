import React, { useState } from 'react';
import './BtnIcon.css';

const BtnIcon = ({ icon, text, active, onClick, dropdown = [], link }) => {
  return (
    <>
      <section className={`btn-icon-container ${active ? 'active' : ''}`} onClick={onClick}>
        <div className='btn-icon-image'>
          <img src={icon} alt="icono" />
        </div>
        <div className='btn-icon-txt'>
          {text}
        </div>
      </section>

    
      {active && dropdown.length > 0 && (
        <div className="dropdown-menu">
          {dropdown.map((option, index) => (
            <div key={index} className="btn-icon-container dropdown-option">
              <div className="btn-icon-txt">{option.text}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BtnIcon;
