import React from 'react'
import Menu from '../components/Menu'

import './UserManagementPage.css'
import SearchBar from '../components/SearchBar'
import UserTable from '../components/UserTable'
import ExportActions from '../components/ExportActions'
import BtnActions from '../components/botones/BtnActions'
import BtnActionsText from '../components/botones/BtnActionsText'

import userLogo from '../assets/icons/userblack.svg'
import BtnLogout from '../components/BtnLogout'
import Header from '../components/Header'

import './UserManagementPage.css'

const UserManagementPage = () => {
 
  const users = [
    { name: 'Alejandro Matias Portugal Quiroga', email: 'alejito@gmail.com', role: 'Profesor' },
    { name: 'Sebastian Vladimir Altuzarra', email: 'pedrito@gmail.com', role: 'Padre de familia' },
    { name: 'Fernanda Adriana Perez Ramirez', email: 'juancito@gmail.com', role: 'Psicologo' },
    { name: 'Alejandro Matias Portugal Quiroga', email: 'sebas@gmail.com', role: 'Administrador' },
    { name: 'Sebastian Vladimir Altuzarra', email: 'nico@gmail.com', role: 'Profesor' },
    { name: 'Fernanda Adriana Perez Ramirez', email: 'daniel@gmail.com', role: 'Padre de familia' },
    { name: 'Alejandro Matias Portugal Quiroga', email: 'fernando@gmail.com', role: 'Profesor' },
    { name: 'Sebastian Vladimir Altuzarra', email: 'sebas@gmail.com', role: 'Profesor' },
    { name: 'Fernanda Adriana Perez Ramirez', email: 'daniel@gmail.com', role: 'Padre de familia' },
    { name: 'Sebastian Vladimir Altuzarra', email: 'pedrito@gmail.com', role: 'Administrador' },
  ];
 
  return (
  <>
 
  <section className='user-management-container'>
    <Header title={'GESTIÓN DE USUARIOS'} subtitle={'Listado de usuarios del sistema'}/>
    <Menu/>
    <section className='user-management-search-export-container'>
      <SearchBar/>
      <ExportActions/>
    </section>
      <UserTable users={users}/>
  </section>
  </>
  )
}

export default UserManagementPage