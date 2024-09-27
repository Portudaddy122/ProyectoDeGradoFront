import React from 'react'
import './UserForm.css'
import TextInput from './TextInput'
import SelectInput from './SelectInput '
import TimeInput from './TimeInput '

const UserForm = () => {
  return (
    <form className="user-form">
    <TextInput label="Nombres" placeholder="Escriba los nombres del usuario" />
    <TextInput label="Apellidos" placeholder="Escriba los apellidos del usuario" />
    <TextInput label="Correo" placeholder="Escriba el correo del usuario" />
    <TimeInput labelFrom="De" labelTo="Hasta" />
    

    <SelectInput 
      label="Rol" 
      placeholder="Selecciona el rol del usuario" 
      options={["Profesor", "Psicologo", "Administrador"]} 
    />

    <SelectInput 
      label="Materia" 
      placeholder="Seleccionar la materia" 
      options={["Matematicas", "Sociales", "Psicologia", "Quimica"]} 
    />

    <TextInput label="Fecha" placeholder="MM/DD/YYYY" />
    
    <SelectInput 
      label="Días de reunion" 
      placeholder="Selecciona el dia de disponibilidad" 
      options={["Lunes", "Martes", "Miercoles", "Jueves"]} 
    />
  </form>
  )
}

export default UserForm