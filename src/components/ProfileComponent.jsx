import React from 'react'
import './ProfileComponent.css';
import TextInput from './TextInput';
import SelectInput from './SelectInput ';

const ProfileComponent = () => {
  return (
    <div className="profile-container">
    <div className="profile-basic-info">
      <div className="profile-image">
        <div className="profile-icon"></div>
      </div>
      <TextInput label="Nombres" value="Sebastian Alejandro" />
      <TextInput label="Apellidos" value="Vladimir Altuzarra" />
      <TextInput label="Correo electronico" value="Vladimir@gmail.com" />
    </div>

    <div className="profile-settings">
      <h2>Datos del perfil</h2>
      <SelectInput label="Rol" options={['Administrador']} />
      <TextInput label="Contraseña Actual" value="********************" />
      <TextInput label="Contraseña Nueva" value="********************" />
      <TextInput label="Confirmar Contraseña" value="********************" />
    </div>
  </div>
  )
}

export default ProfileComponent