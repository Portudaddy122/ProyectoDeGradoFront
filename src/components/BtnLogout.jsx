import React from 'react'

import './BtnLogout.css'
import userLogo from '../assets/icons/userblack.svg'

import BtnActionsText from './botones/BtnActionsText'

const BtnLogout = () => {
  return (
    <>
    <section className='btnLogout-container'>
      <img src={userLogo} alt=""  height={30} width={40}/>
      <BtnActionsText color={'green'} text={'Log out'}/>

    </section>
     </>
  )
}

export default BtnLogout