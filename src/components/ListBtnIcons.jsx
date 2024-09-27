import React, { useState } from 'react'



import iconHome from '../assets/icons/home-2.svg'
import iconUser from '../assets/icons/user.svg'

import BtnIcon from './botones/BtnIcon'

const btnsIcons = [

    
    {
        icon:iconHome,
        text: 'Inicio',
        dropdown:[
            {text:'Agregar Usuario'},
            {text:'Editar Usuario'},
            {text:'Eliminar Usuario'}]
            
    },
    {
        icon:iconUser,
        text: 'Gestión de Usuarios',
        
        
        
    },
    {
        icon:iconHome,
        text: 'Listar Usuarios',
       
    },
    {
        icon:iconUser,
        text: 'Gestión de Usuarios',
        
    },
    {
        icon:iconHome,
        text: 'Listar Usuarios',
       
    }

]

const DropdownMenu = ({ options }) => {
    return (
        <div className="dropdown-menu">
            {options.map((option, index) => (
                <div
                    key={index}
                    className="dropdown-option"
                    onClick={option.action}
                >
                    {option.text}
                </div>
            ))}
        </div>
    )
}

const ListBtnIcons = () => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null)

    const handleDropdownToggle = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index)
    }

    return (
        <>
            {btnsIcons.map((btns, index) => (
                <div key={index}>
                    <BtnIcon
                        icon={btns.icon}
                        text={btns.text}
                        active={openDropdownIndex === index}
                        onClick={() => handleDropdownToggle(index)}
                    />
                    {/* Mostrar el dropdown solo si el botón correspondiente está activo */}
                    {openDropdownIndex === index && (
                        <DropdownMenu options={btns.dropdown} />
                    )}
                </div>
            ))}
        </>
    )
}

export default ListBtnIcons