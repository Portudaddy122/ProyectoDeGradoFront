import React from 'react';
import UserForm from '../components/UserForm';
import Header from '../components/Header';

const UserManagementForm = () => {
  return (
    <div className='UserManagementForm-container'>
      <Header title={"GESTION DE USUARIOS"} subtitle={"Agrega un nuevo usuario"} />
      <UserForm />
    </div>
  );
};

export default UserManagementForm;
