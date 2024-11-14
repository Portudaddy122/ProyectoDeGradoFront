import React, { useState } from 'react';
import './Informe.css';
import Header from './Header.jsx';
import imgInforme from '../assets/image/Informe.jpg';
import imgActas from '../assets/image/Actas.jpg';
import imgProfesores from '../assets/image/Profesores.jpeg';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getUsuarios } from '../service/users.service.jsx';
import { getProfesor } from '../service/profesor.service.jsx';
import { getPsicologo } from '../service/psicologo.service.jsx';
import { obtenerListaEntrevistaPorRango } from '../service/teoriaDeColas.service.jsx';

const Informe = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const downloadUsuariosPDF = async () => {
        const response = await getUsuarios();
        const usuarios = response.data;

        const doc = new jsPDF();
        doc.text('Listado de Usuarios Registrados', 14, 10);

        const tableColumn = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Rol'];
        const tableRows = usuarios.map((user) => [
            user.nombres,
            user.apellidopaterno,
            user.apellidomaterno,
            user.rol,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('reporte_usuarios.pdf');
    };

    const downloadProfesoresPDF = async () => {
        const response = await getProfesor();
        const profesores = response.data;

        const doc = new jsPDF();
        doc.text('Listado de Profesores Registrados', 14, 10);

        const tableColumn = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Correo'];
        const tableRows = profesores.map((profesor) => [
            profesor.nombres,
            profesor.apellidopaterno,
            profesor.apellidomaterno,
            profesor.email,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('reporte_profesores.pdf');
    };

    const downloadPsicologosPDF = async () => {
        const response = await getPsicologo();
        const psicologos = response.data;

        const doc = new jsPDF();
        doc.text('Listado de Psicólogos Registrados', 14, 10);

        const tableColumn = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Correo'];
        const tableRows = psicologos.map((psicologo) => [
            psicologo.nombres,
            psicologo.apellidopaterno,
            psicologo.apellidomaterno,
            psicologo.email,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save('reporte_psicologos.pdf');
    };


    const downloadCitasPDF = async () => {
        if (!startDate || !endDate) {
            alert('Por favor selecciona ambas fechas.');
            return;
        }

        try {
            const response = await obtenerListaEntrevistaPorRango({ startDate, endDate });
            const citas = response.data;

            const doc = new jsPDF();
            doc.text(`Padres de Familia Citados del ${startDate} al ${endDate}`, 14, 10);

            const tableColumn = ['Nombres', 'Apellido Paterno', 'Apellido Materno', 'Correo', 'Estado'];
            const tableRows = citas.map((cita) => [
                cita.nombres,
                cita.apellidopaterno,
                cita.apellidomaterno,
                cita.email,
                cita.estado ? 'Completado' : 'Pendiente',
            ]);

            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 20,
            });

            doc.save(`citas_${startDate}_a_${endDate}.pdf`);
        } catch (error) {
            console.error('Error al generar el PDF de citas:', error);
        }
    };

    return (
        <>
            <Header title="GESTION DE REPORTES" subtitle="Listado de todos los reportes del sistema" />
            <div className="informe-container">
                <h2 className="informe-title">TIPOS DE REPORTES</h2>
                <div className="informe-grid">


                    <div className="informe-card">
                        <img src={imgInforme} alt="Reporte de Usuarios" className="informe-image" />
                        <h3 className="informe-titulo">Reporte de Usuarios Registrados</h3>
                        <button onClick={downloadUsuariosPDF} className="informe-button">Descargar PDF</button>
                    </div>

                    <div className="informe-card">
                        <img src={imgProfesores} alt="Reporte de Profesores" className="informe-image" />
                        <h3 className="informe-titulo">Reporte de Profesores Registrados</h3>
                        <button onClick={downloadProfesoresPDF} className="informe-button">Descargar PDF</button>
                    </div>

                    <div className="informe-card">
                        <img src={imgActas} alt="Reporte de Psicólogos" className="informe-image" />
                        <h3 className="informe-titulo">Reporte de Psicólogos Registrados</h3>
                        <button onClick={downloadPsicologosPDF} className="informe-button">Descargar PDF</button>
                    </div>
                    {/* Reporte de Citas con Rango de Fechas */}
                    <div className="informe-card">
                        <img src={imgActas} alt="Reporte de Citas" className="informe-image" />
                        <h3 className="informe-titulo">Reporte de Padres Citados por Rango de Fechas</h3>

                        <div className="date-selector">
                            <label htmlFor="start-date">Fecha Inicial:</label>
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />

                            <label htmlFor="end-date">Fecha Final:</label>
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <button onClick={downloadCitasPDF} className="informe-button">
                            Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Informe;
