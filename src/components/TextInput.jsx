import React from 'react'
import './TextInput.css'

const TextInput = ( {label, placeholder}) => {
  return (
        <div className="text-input-container">
          <label>{label}</label>
          <input type="text" placeholder={placeholder} />
        </div>
  )
}

export default TextInput