import React, { useState } from 'react'

import './BtnActionsText.css'

const BtnActionsText = ({color,text,onClick}) => {
    const [active,setActive]=useState(false)
    const handleClicked=()=>{
        setActive(!active)
        if (onClick) {
          onClick()
        }
    }
  return (
    <>
    <section className={
            `btn-actions-text-container ${color=='yellow'?'yellow':color=='red'?'red':'green'}
             ${active?'clicked':''}`}
            onClick={handleClicked}>
        <p>{text}</p>
    </section>
    </>
  )
}

export default BtnActionsText