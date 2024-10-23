// src/components/Toast.jsx
import React, { useEffect } from 'react';
import './Toast.css'; // Asegúrate de tener los estilos en Toast.css

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // El toast desaparecerá después de 3 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast-container ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
