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
  const exportTitle = title || 
    (context === 'padres'
      ? 'Listado de Padres de Familia'
      : context === 'usuarios'
      ? 'Listado de Usuarios del Sistema'
      : 'Listado de Entrevistas');

      const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text(`Fecha: ${exportDate}`, 14, 10);
        doc.text(exportTitle, 14, 20);
      
        // Definir las columnas según el contexto
        const tableColumn = context === 'padres' || context === 'usuarios'
          ? ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Rol', 'Fecha', 'Hora']
          : ['Orden', 'Nombres', 'Apellido Paterno', 'Apellido Materno', 'Correo', 'Fecha', 'Hora', 'Estado'];
      
        // Mapear filas según el contexto y usar la hora existente (horafinentrevista)
        const tableRows = data.map((item, index) => {
          return context === 'padres' || context === 'usuarios'
            ? [
                item.nombres,
                item.apellidopaterno,
                item.apellidomaterno,
                item.rol,
                item.fecha,
                item.nuevaHorafinEntrevista // Usar la hora directamente
              ]
            : [
                index + 1,
                item.nombres,
                item.apellidopaterno,
                item.apellidomaterno,
                item.email,
                item.fecha,
                item.nuevaHorafinEntrevista, // Usar la hora directamente
                item.estado ? 'Completado' : 'No realizado'
              ];
        });
      
        // Generar la tabla en el PDF
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 30,
        });
      
        // Guardar el archivo PDF
        doc.save(`${context}.pdf`);
      };
      
      
  const exportToExcel = () => {
    const worksheetData = [
      { Fecha: exportDate },
      ...data.map((item, index) =>
        context === 'padres' || context === 'usuarios'
          ? {
              Nombres: item.nombres,
              'Apellido Paterno': item.apellidopaterno,
              'Apellido Materno': item.apellidomaterno,
              Rol: item.rol,
            }
          : {
              Orden: index + 1,
              Nombres: item.nombres,
              'Apellido Paterno': item.apellidopaterno,
              'Apellido Materno': item.apellidomaterno,
              Correo: item.email,
              Estado: item.estado ? 'Completado' : 'Cancelado',
            }
      )
    ];

    const worksheet = xlsx.utils.json_to_sheet(worksheetData);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, context);
    xlsx.writeFile(workbook, `${context}.xlsx`);
  };

  const exportToWord = () => {
    let content = `
      <h2>Fecha: ${exportDate}</h2>
      <h2>${exportTitle}</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          ${context === 'padres' || context === 'usuarios'
          ? '<th>Nombres</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>Rol</th>'
          : '<th>Orden</th><th>Nombres</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>Correo</th><th>Estado</th>'}
        </tr>
    `;

    data.forEach((item, index) => {
      content += `
        <tr>
          ${context === 'padres' || context === 'usuarios'
          ? `<td>${item.nombres}</td><td>${item.apellidopaterno}</td><td>${item.apellidomaterno}</td><td>${item.rol}</td>`
          : `<td>${index + 1}</td><td>${item.nombres}</td><td>${item.apellidopaterno}</td><td>${item.apellidomaterno}</td><td>${item.email}</td><td>${item.estado ? 'Completado' : 'Cancelado'}</td>`}
        </tr>
      `;
    });

    content += '</table>';

    const blob = new Blob(['\ufeff', content], {
      type: 'application/msword',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${context}.doc`;
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
