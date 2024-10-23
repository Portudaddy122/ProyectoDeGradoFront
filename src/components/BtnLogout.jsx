import React, { useContext } from 'react';
import './BtnLogout.css';
import userLogo from '../assets/icons/userblack.svg';
import BtnActionsText from './botones/BtnActionsText';
import AuthContext from '../auth'; // Asegúrate de importar el contexto

const BtnLogout = () => {
  const { logout } = useContext(AuthContext); // Utiliza el contexto para el logout

  const handleLogout = () => {
    logout(); // Llamar a la función de logout
  };

  return (
    <section className="btnLogout-container" onClick={handleLogout}>
      <img src={userLogo} alt="user icon" height={30} width={40} />
      <BtnActionsText color={'green'} text={'Log out'} />
    </section>
  );
};

export default BtnLogout;
