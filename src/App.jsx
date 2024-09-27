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
import UserManagementPage from './pages/UserManagementPage'
import BtnLogout from './components/BtnLogout'

import './App.css'
import UserForm from './components/UserForm'
import ProfileComponent from './components/ProfileComponent'
import ReportCard from './components/ReportCard'
import Login from './components/Login.jsx'
import UserManagementHome from './pages/UserManagementHome.jsx'
import DynamycCard from './components/DynamycCard.jsx'



function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }
  const handleSearch = () => {
    console.log('Searching for: ', searchQuery)
  }
 
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    content: null,
    onClose: null,
    onSave: null,
    onCancel: null,
    onConfirm: null,
    isEdit: false
  })
  const handleView = () => {
    setModalConfig({
      isOpen: true,
      title: 'Visualizar acta',
      content: (
        <div>
         <p> Puedes editar los campos del acta seleccionada.</p>
          <section className='modal-edit-content-top'>

            <label>Motivo</label>
            <select>
              <option>Academico</option>
              <option>Disciplinario</option>
            </select>
            <label>Fecha</label>
            <input type="date" />
          </section>
          <section className='modal-edit-contentn-materia'>
            <label>Materia</label>
            <select>
              <option>Fisica</option>
              <option>Matematicas</option>
            </select>
          </section>
          <section className='modal-edit-content-bottom'>
            <label>Descripcion</label>
            <textarea>Se acordó durante la reunion que el estudiante se comprometió a mejorar las calificaciones para la tercera evaluacion semestral</textarea>
          </section>
        </div>
      ),
      onClose: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
      onSave: null,
      onCancel: null,
      onConfirm: null,
      isEdit: false
    });
  };

  const handleEdit = () => {
    setModalConfig({
      isOpen: true,
      title: 'EDITAR UN ACTA',
      content: (
        <div>
          <p> Puedes editar los campos del acta seleccionada.</p>
          <section className='modal-edit-content-top'>

            <label>Motivo</label>
            <select>
              <option>Academico</option>
              <option>Disciplinario</option>
            </select>
            <label>Fecha</label>
            <input type="date" />
          </section>
          <section className='modal-edit-contentn-materia'>
            <label>Materia</label>
            <select>
              <option>Fisica</option>
              <option>Matematicas</option>
            </select>
          </section>
          <section className='modal-edit-content-bottom'>
            <label>Descripcion</label>
            <textarea>Se acordó durante la reunion que el estudiante se comprometió a mejorar las calificaciones para la tercera evaluacion semestral</textarea>
          </section>
        </div>
      ),
      onClose: null,
      onSave: () => console.log('Save clicked!'),
      onCancel: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
      onConfirm: null,
      isEdit: true
    });
  };
  const handleDelete = () => {
    setModalConfig({
      isOpen: true,
      title: 'ELIMINAR UN ACTA',
      content: (
        <div>
          <p>¿Estás seguro que deseas eliminar esta acta?</p>
        </div>
      ),
      onClose: null,
      onSave: () => console.log('Save clicked!'),
      onSave: null,
      onCancel: () => setModalConfig(prev => ({ ...prev, isOpen: false })),
      onConfirm: () => console.log('Confirm clicked'),
      isEdit: false
    });
  }
  return (
    <>
      {/* <ListBtnIcons/>
     <BtnActions/>
     <BtnActionsText/> */}
      {/* <Menu/> */}
      {/* <UserTable users={users} /> */}
      {/* <SearchBar 
      value={searchQuery}
      onChange={handleSearchChange}
      onSearch={handleSearch}/> */}
      {/* <BtnActionsText color="green" text="Ver" onClick={handleView}/>
      <BtnActionsText color="yellow" text="Editar" onClick={handleEdit}/>
      <BtnActionsText color="red" text="Eliminar" onClick={handleDelete}/>
      <DynamicModelForUsers {...modalConfig} />
        <ExportActions/>
        <SearchBar/> */}

  {/*<section className='school-managment-container'>
        <Menu/>
       
        {/* <BtnActionsText color="red" text ="Eliminar" onClick={handleDelete}/>
        <DynamicModelForUsers {...modalConfig}/> */}
    {/* </section>         */}
    {/* <UserForm/>
    <ProfileComponent/>
    <ReportCard/> */}
    
     {/* <Login/> */}
     {/* <ColumnGroupingTable/> */}
     <UserManagementHome/>
      {/* <UserManagementPage/> */}
     {/* <DynamycCard/> */}
     
    </>
  )
}

export default App
