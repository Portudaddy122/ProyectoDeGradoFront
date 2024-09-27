import React from 'react'
import './ExportActions.css'


import excelIcon from '../assets/icons/pdf.svg';
import excelPng from '../assets/icons/excel.svg';
import wordIcon from '../assets/icons/word.svg';
import printIcon from '../assets/icons/Printer.svg';

const ExportActions = () => {
  return (
    <div className="export-actions-container">
  <img src={excelIcon} alt="Export to PDF" />
      <img src={excelPng} alt="Export to Excel" />
      <img src={wordIcon} alt="Export to Word" />
      <img src={printIcon} alt="Print" />
  </div>
  )

}

export default ExportActions