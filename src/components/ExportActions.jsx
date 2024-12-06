import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as xlsx from 'xlsx';
import './ExportActions.css';

import excelIcon from '../assets/icons/excel.svg';
import pdfIcon from '../assets/icons/pdf.svg';
import wordIcon from '../assets/icons/word.svg';
import printIcon from '../assets/icons/Printer.svg';

const ExportActions = ({ data, context, selectedDate, title }) => {
  const currentDate = new Date().toLocaleDateString();
  const exportDate = selectedDate ? selectedDate : currentDate;

  // Generar el título automáticamente si no se proporciona
  const exportTitle =
    title || 'Control de Usuarios con Ingresos';

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Fecha: ${exportDate}`, 14, 10);
    doc.text(exportTitle, 14, 20);

    // Definir las columnas para el PDF
    const tableColumn = [
      'Nombre Completo',
      'Rol',
      'Fecha de Ingreso',
      'Hora de Ingreso',
    ];

    // Mapear las filas desde los datos
    const tableRows = data.map((item) => [
      item.nombrecompleto || 'Sin registro',
      item.rol || 'Sin registro',
      item.fechaingreso?.split('T')[0] || 'Sin registro', // Formatear la fecha
      item.horaingreso || 'Sin registro',
    ]);

    // Generar la tabla en el PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Guardar el archivo PDF
    doc.save(`${context || 'datos'}.pdf`);
  };

  const exportToExcel = () => {
    const worksheetData = data.map((item) => ({
      'Nombre Completo': item.nombrecompleto || 'Sin registro',
      Rol: item.rol || 'Sin registro',
      'Fecha de Ingreso': item.fechaingreso?.split('T')[0] || 'Sin registro',
      'Hora de Ingreso': item.horaingreso || 'Sin registro',
    }));

    const worksheet = xlsx.utils.json_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, context || 'Datos');
    xlsx.writeFile(workbook, `${context || 'datos'}.xlsx`);
  };

  const exportToWord = () => {
    let content = `
      <h2>Fecha: ${exportDate}</h2>
      <h2>${exportTitle}</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Nombre Completo</th>
          <th>Rol</th>
          <th>Fecha de Ingreso</th>
          <th>Hora de Ingreso</th>
        </tr>
    `;

    data.forEach((item) => {
      content += `
        <tr>
          <td>${item.nombrecompleto || 'Sin registro'}</td>
          <td>${item.rol || 'Sin registro'}</td>
          <td>${item.fechaingreso?.split('T')[0] || 'Sin registro'}</td>
          <td>${item.horaingreso || 'Sin registro'}</td>
        </tr>
      `;
    });

    content += '</table>';

    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${context || 'datos'}.doc`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="export-actions-container">
      <img src={pdfIcon} alt="Export to PDF" onClick={exportToPDF} />
      <img src={excelIcon} alt="Export to Excel" onClick={exportToExcel} />
      <img src={wordIcon} alt="Export to Word" onClick={exportToWord} />
      <img src={printIcon} alt="Print" onClick={handlePrint} />
    </div>
  );
};

export default ExportActions;
