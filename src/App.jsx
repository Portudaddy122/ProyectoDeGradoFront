import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BtnIcon from './components/botones/BtnIcon'
import ListBtnIcons from './components/ListBtnIcons'
import BtnActions from './components/botones/BtnActions'
import BtnActionsText from './components/botones/BtnActionsText'
import Menu from './components/Menu'
import UserTable from './components/UserTable'
import SearchBar from './components/SearchBar'
import DynamicModelForUsers from './components/DynamicModelForUsers'
import ExportActions from './components/ExportActions'
import UserManagementPage from './pages/UserManagementPage.jsx'
import BtnLogout from './components/BtnLogout'

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm'
import ProfileComponent from './components/ProfileComponent'
import ReportCard from './components/ReportCard'
import Login from './components/Login.jsx'
import UserManagementHome from './pages/UserManagementHome.jsx'
import DynamycCard from './components/DynamycCard.jsx'
import Modales from './components/Modales.jsx'
import UserManagementForm from './pages/UserManagementForm.jsx'



const App = () => {
  return (
    <>
     {/* <UserManagementHome/> */}
      {/* <UserManagementPage/> */}
      <DynamicModelForUsers/>

      <Router>
            <Menu/>
            <div style={{ marginLeft: '250px', padding: '20px' }}> {/* Espacio para el contenido */}
                <Routes>
                    <Route path="/" element={<UserManagementHome />} />
                    <Route path="/listar" element={<UserManagementPage />} />
                    <Route path="/agregar" element={<UserManagementForm />} />
                    <Route path="/editar" element={<UserManagementPage />} />
                    <Route path="/Modales" element={<Modales />} />
                    
                </Routes>
            </div>
        </Router>
    
     
    </>
  )
}

export default App
