import React from "react";
import { useNavigate } from "react-router-dom";
import "./DynamycCard.css";
import BtnActionsText from "./botones/BtnActionsText";

const DynamycCard = ({ NumberUsers, icon, nameTitle, route }) => {
  const navigate = useNavigate(); // Hook para la navegación

  // Función para manejar el clic en el botón
  const handleViewClick = () => {
    navigate(route); // Navegar a la ruta especificada
  };

  return (
    <section className="Dynamic-Card-Container">
      <section className="Icon-container">
        <img src={icon} alt="icono" />
      </section>
      <section className="Numeber-User-container">
        <h2>{NumberUsers}</h2>
      </section>
      <h3 className="nombreTitulo">{nameTitle}</h3>
      <section className="btnView-container">
        {/* Botón que redirige a la ruta dinámica */}
        <BtnActionsText color={"green"} text={"Ver"} onClick={handleViewClick} />
      </section>
    </section>
  );
};

export default DynamycCard;
