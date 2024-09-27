import React from 'react'

import './SelectInput.css'

const SelectInput  = ({ label, options, placeholder }) => {
  return (
    <div className="select-input-container">
    <label>{label}</label>
    <select>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
  )
}

export default SelectInput 