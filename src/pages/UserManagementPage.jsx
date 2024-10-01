import React, { useState, useEffect } from 'react'
import Menu from '../components/Menu.jsx'

import './UserManagementHome.css'
import SearchBar from '../components/SearchBar.jsx'
import UserTable from '../components/UserTable.jsx'
import ExportActions from '../components/ExportActions.jsx'
import BtnActions from '../components/botones/BtnActions.jsx'
import BtnActionsText from '../components/botones/BtnActionsText.jsx'

import userLogo from '../assets/icons/userblack.svg'
import BtnLogout from '../components/BtnLogout.jsx'
import Header from '../components/Header.jsx'
import {getUsuarios, } from '../service/users.service.jsx'

import './UserManagementPage.css'


const UserManagementPage = () => {
  
const [users, setUsers] = useState([])
useEffect(() =>{
  fetchUsers();
},[]);

const fetchUsers = async ()=>{
  const response= await getUsuarios();
  setUsers(response.data);
  console.log(response.data);
  

}
  return (
  <>
 
  <section className='user-management-container'>
    <Header title={'GESTIÓN DE USUARIOS'} subtitle={'Listado de usuarios del sistema'}/>
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