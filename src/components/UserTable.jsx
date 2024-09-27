import React from 'react'
import './UserTable.css';
import BtnActionsText from './botones/BtnActionsText';



function UserTable({ users }) {
    let actions=[
    {
        color:'red',
        text:'Eliminar'
    },
    {
        color:'Ver',
        text:'Verde'
    },
    {
        color:'yellow',
        text:'Editar'
    },
]
  return (
    <section className='user-table-container'>
    <table className="user-table">
    <thead>
      <tr>
        <th>Nombres</th>
        <th>Correo</th>
        <th>Rol</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
          <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <section className='btn-actions'>
            {actions.map(action=><BtnActionsText color={action.color} text={action.text}/>)}
            </section>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      </section>
  )
}

export default UserTable