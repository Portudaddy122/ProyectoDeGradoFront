
import React from 'react';
import BtnLogout from './BtnLogout';

const Unauthorized = () => {
  return (
    <div>
      <h1>Acceso no autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <BtnLogout/>
    </div>
  );
};

export default Unauthorized;
