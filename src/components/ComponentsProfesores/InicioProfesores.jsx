import React from 'react';
import './InicioProfesores.css';
import logo from '../../assets/icons/logo.svg';  // Ruta del logo
import directorImage from '../../assets/image/director.jpeg'; // Ruta de la imagen de la directora (ajusta la ruta según el archivo correcto)
import Header from '../Header.jsx';

const InicioProfesores = () => {
  return (
    <>
    <Header title={"INICIO"} subtitle={"Bienvenido al sistema escolar IDEB"}/>
    <hr style={{marginLeft:"50px"}}/>
    <div className="home-container">
      <div className="image-container">
        <img src={directorImage} alt="Directora General" className="director-image" />
        <p className="director-name animate-text">Marta Mendez</p>
        <p className="director-title animate-text">Directora General</p>
      </div>

      <div className="description-container animate-text">
        <p>
          La Unidad Educativa Instituto de Educación Bancaria es una institución dedicada a la formación profesional de calidad...
        </p>
      </div>

      <img src={logo} alt="Logo Marca de Agua" className="watermark-logo" />
    </div>
    </>
  );
};

export default InicioProfesores;
