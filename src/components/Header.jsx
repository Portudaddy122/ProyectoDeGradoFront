import React from 'react'
import BtnLogout from './BtnLogout';

import './Header.css'

const Header = ({title,subtitle}) => {
  return (
    <>
    <section className='header-container'>
      <div className='header-titles'>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        
      </div>
        <BtnLogout/>

    </section>
    </>
  )
}

export default Header