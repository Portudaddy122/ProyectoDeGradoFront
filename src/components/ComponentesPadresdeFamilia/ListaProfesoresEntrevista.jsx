import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuPadres from './MenuPadres';
import { getProfesoresConHorarios } from '../../service/profesor.service.jsx';
import './ListaProfesoresEntrevistas.css';

const ListaProfesoresEntrevista = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const response = await getProfesoresConHorarios();
        setRows(response.data);
      } catch (error) {
        console.error('Error al cargar profesores con horarios:', error);
      }
    };

    fetchProfesores();
  }, []);

  const handleNavigate = (idprofesor, nombre, materia, dia, horainicio, horafin) => {
    navigate('/agendarEntrevistaPadre', {
      state: { idProfesor: idprofesor, nombre, materia, dia, horainicio, horafin },
    });
  };

  return (
    <div className="container-scrollable">
      <MenuPadres />
      <Paper elevation={3} className="table-container">
        <h1 className="title">SELECCIONE EL PROFESOR</h1>
        <div className="table-scrollable">
          <table className="interview-table">
            <thead>
              <tr>
                <th>Nombre del profesor</th>
                <th>Materia</th>
                <th>Día de entrevista</th>
                <th>Agendar una cita</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.idprofesor}>
                  <td>{row.nombre}</td>
                  <td>{row.materia}</td>
                  <td>{row.dia}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      className="button-go"
                      onClick={() =>
                        handleNavigate(row.idprofesor, row.nombre, row.materia, row.dia, row.horainicio, row.horafin)
                      }
                    >
                      Ir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </div>
  );
};

export default ListaProfesoresEntrevista;
