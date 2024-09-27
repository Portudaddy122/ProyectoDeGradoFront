import React from "react";
import "./DynamycCard.css";
import BtnActionsText from "./botones/BtnActionsText";


const DynamycCard = ({ NumberUsers, icon, nameTitle }) => {
  return (
    <>
      <section className="Dynamic-Card-Container">
      <section className="Icon-container">
            <img src={icon} alt="icono" />
          </section>
        <section className="Numeber-User-container">
          <h2>{NumberUsers}</h2>
          
        </section>
        <h3>{nameTitle}</h3>
        <section className='btnView-container'>
        <BtnActionsText color={'green'} text={'Ver'}/>

        </section>
      </section>
    </>
  );
};

export default DynamycCard;
