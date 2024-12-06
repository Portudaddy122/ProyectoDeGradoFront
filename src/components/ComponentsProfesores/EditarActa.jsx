import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './EditarActa.css';
import Header from '../Header.jsx';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes } from '../../service/Estudiante.service.jsx';

const EditarActa = () => {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getEstudiantes();
                const studentsWithId = response.data.map((student) => ({
          ...student,
          uniqueId: `${student.idcurso}-${student.nivel}-${student.idestudiante}`,
          curso: student.nombrecurso ? `${student.nombrecurso}` : `Curso desconocido (${student.idcurso})`,
        }));
        setStudents(studentsWithId);
      } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredRows = students.filter((student) =>
    `${student.nombres} ${student.apellidopaterno} ${student.apellidomaterno}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { field: 'nombres', headerName: 'Nombre', flex: 1 },
    { field: 'apellidopaterno', headerName: 'Apellido', flex: 1 },
    { field: 'curso', headerName: 'Curso', flex: 0.5 },
    { field: 'nivel', headerName: 'Nivel', flex: 0.5 },
    {
      field: 'acciones',
      headerName: 'Actas del estudiante',
      flex: 1,
      renderCell: (params) => (
        <div className="acciones-buttons">
        <button
  className="ver-button"
  onClick={() =>
    navigate('/verActas', {
      state: { idestudiante: params.row.idestudiante },
    })
  }
>
  Ver Carpeta
</button>

      </div>
      ),
    },
  ];


  return (
    <>
      <Header title="GESTIÓN DE ACTAS" subtitle="Listado de actas por carpetas de cada estudiante" />
      <div className="editar-acta-container">
        <div className="student-search">
          <input
            type="text"
            id="search"
            placeholder="Buscar por nombre del estudiante"
            className="student-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Paper className="data-grid-container">
          {loading ? (
            <p>Cargando estudiantes...</p>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={7}
              rowsPerPageOptions={[7]}
              autoHeight
              disableSelectionOnClick
              getRowId={(row) => row.uniqueId}
            />
          )}
        </Paper>
      </div>
    </>
  );
};

export default EditarActa;
