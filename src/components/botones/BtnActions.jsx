import React, { useState } from 'react';
import './BtnActions.css';

const BtnActions = ({ color, icon }) => {
  const [active, setActive] = useState(false);

  const handleIsActive = () => {
    setActive(true);

    // Restablecer a su color original después de un pequeño retraso
    setTimeout(() => {
      setActive(false);
    }, 200); // El retraso es de 200ms, ajusta según tus necesidades
  };

  return (
    <>
      <section
        className={`btn-actions-container ${color === 'red' ? 'red' : 'green'} ${
          active ? 'clicked' : ''
        }`}
        onClick={handleIsActive}
      >
        <div className={`icon ${icon === 'delete' ? 'delete' : 'check'}`}></div>
      </section>
    </>
  );
};

export default BtnActions;
