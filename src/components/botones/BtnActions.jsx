import React, { useState } from 'react'
import './BtnActions.css'
const BtnActions = ({color,icon}) => {
 const[active,setActive]=useState(false) 
//  let color='green',icon='check'

 const handleIsActive=()=>{
    setActive(!active)
 }

  return (
    <>
        <section className={`btn-actions-container ${color==='red'?'red':'green'} ${active?'clicked':''}`}  
                onClick={handleIsActive}    >
            <div className={`icon ${icon==='delete'? 'delete':'check'}`}></div>

        </section>
    </>
  )
}

export default BtnActions