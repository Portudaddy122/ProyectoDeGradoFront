import React, { useState } from 'react';
import './BtnActionsText.css';

const BtnActionsText = ({ color, text, onClick }) => {
  const [active, setActive] = useState(false);

  const handleClicked = () => {
    setActive(true);
    if (onClick) {
      onClick();
    }

    // Restablecer a su color original después de un pequeño retraso
    setTimeout(() => {
      setActive(false);
    }, 200); // El retraso es de 200ms, ajusta según tus necesidades
  };

  return (
    <section
      className={`btn-actions-text-container ${color === 'yellow' ? 'yellow' : color === 'red' ? 'red' : 'green'} ${
        active ? 'clicked' : ''
      }`}
      onClick={handleClicked}
    >
      <p>{text}</p>
    </section>
  );
};

export default BtnActionsText;
