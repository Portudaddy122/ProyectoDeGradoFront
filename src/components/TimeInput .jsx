import React from 'react'
import './TimeInput.css'
function TimeInput ({ labelFrom, labelTo }) {
  return (
    <div className="time-input-container">
    <label>{labelFrom}</label>
    <input type="time" />
    <label>{labelTo}</label>
    <input type="time" />
  </div>
  )
}

export default TimeInput 