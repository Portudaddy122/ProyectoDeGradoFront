import { jsPDF } from 'jspdf';

const exportActas = (acta, estudiante) => {
  if (!acta || !estudiante) {
    console.error('Acta o Estudiante no proporcionado.');
    return;
  }

  const doc = new jsPDF();

  // Margen y ancho de la página
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14; // Margen izquierdo y derecho
  const textWidth = pageWidth - margin * 2;

  // Encabezado
  doc.setFontSize(14);
  doc.text('Acta de Reunión', pageWidth / 2, 10, { align: 'center' });

  // Contenido
  doc.setFontSize(12);
  
  // Introducción
  const introduction = 'Por lo tanto se acuerda con el padre de familia que se dará cumplimiento a lo establecido en esta acta, con fecha de creacion:';
  const introLines = doc.splitTextToSize(introduction, textWidth);
  doc.text(introLines, margin, 25);

  // Información del estudiante y acta
  doc.text(` ${new Date(acta.fechadecreacion).toLocaleDateString()}`, 70, 30);
  doc.text(`Nombre del Estudiante: ${estudiante.nombres} ${estudiante.apellidopaterno}`, margin, 50);
  doc.text(`Materia: ${acta.materia}`, margin, 60);
  doc.text(`Motivo de la acta: ${acta.motivo}`, margin, 70);

  // Descripción
  const description = `Descripción: ${acta.descripcion}`;
  const descriptionLines = doc.splitTextToSize(description, textWidth);
  doc.text(descriptionLines, margin, 80);

  // Espacio para firmas
  doc.text('FIRMA PROFESOR:', margin, 150);
  doc.text('CI:', margin, 160);
  doc.text('FIRMA PADRE DE FAMILIA:', pageWidth / 2, 150);
  doc.text('CI:', pageWidth / 2, 160);

  // Guardar el archivo PDF
  doc.save(`Acta_${estudiante.nombres}_${estudiante.apellidopaterno}.pdf`);
};

export default exportActas;
