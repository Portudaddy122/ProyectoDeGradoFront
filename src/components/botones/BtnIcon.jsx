import React, { useState } from 'react'

import './BtnIcon.css'
const BtnIcon = ({icon,text,active,onClick, link}) => {
  
  return (
    <>
      <section className={`btn-icon-container ${active ? 'active':''}`}
        onClick={onClick}
      >
        <div className='btn-icon-image'>
           <img src={icon} alt="icono" />
           </div>
        <div className='btn-icon-txt'>
          {text}
        </div>

      </section>
    </>
  )
}

export default BtnIcon