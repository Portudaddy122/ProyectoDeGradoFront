import React from 'react';
import './InicioProfesores.css';
import logo from '../../assets/icons/logo.svg'; // Ruta del logo
import directorImage from '../../assets/image/Directora.jpg'; // Ruta de la imagen de la directora
import Header from '../Header.jsx';

const InicioProfesores = () => {
  return (
    <>
      <Header title={"INICIO"} subtitle={"Bienvenido al sistema escolar IDEB"} />
      <hr style={{ marginLeft: "50px" }} />
      <div className="home-container">
        {/* Imagen y texto al mismo nivel */}
        <div className="image-and-text">
          <div className="image-container">
            <img src={directorImage} alt="Directora General" className="director-image" />
            <div className="director-info">
              <p className="director-name animate-text">Martha Mendez De Torres</p>
              <p className="director-title animate-text">Directora General</p>
            </div>
          </div>

          <div className="description-container animate-text">
            <p>
              Les damos la más cordial bienvenida al portal web de la Unidad Educativa Instituto de Educación Bancaria.
              A través de esta plataforma, buscamos facilitar su acceso a recursos y herramientas que les permitirán realizar su labor educativa de manera más eficiente y efectiva.
              <br /><br />
              Nuestra institución se distingue por su compromiso con la formación de jovenes lideres con valores integros que les serviran para afrontar el mundo, y este sistema está diseñado para apoyarlos en el proceso educativo.
              <br /><br />
              Gracias por formar parte de este equipo y por su dedicación. Estamos seguros de que, con su esfuerzo y colaboración, podremos seguir alcanzando los más altos estándares educativos.
              <br /><br />
              ¡Bienvenidos y adelante!
            </p>
          </div>
        </div>

        {/* Marca de agua */}
        <img src={logo} alt="Logo Marca de Agua" className="watermark-logo" />
      </div>
    </>
  );
};

export default InicioProfesores;
