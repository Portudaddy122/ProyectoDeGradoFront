import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import './ListEstudiantes.css';
import Header from '../Header.jsx';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getEstudiantes } from '../../service/Estudiante.service.jsx';

function ListEstudiantes() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Recuperar el `idreservarentrevista` desde el estado pasado en la navegación
  const idreservarentrevista = location.state?.idreservarentrevista;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getEstudiantes();
        const studentsWithId = response.data.map((student) => ({
          ...student,
          uniqueId: `${student.idcurso}-${student.nivel}-${student.idestudiante}`,
          curso: student.nombrecurso ? `${student.nombrecurso} ` : `Curso desconocido (${student.idcurso})`,
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
    { field: 'curso', headerName: 'Curso', flex: 0.5 }, // Cambiado a 'curso'
    { field: 'nivel', headerName: 'Nivel', flex: 0.5 },
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 0.5,
      renderCell: (params) => (
        <button
          className="crear-button"
          onClick={() =>
            navigate('/formActa', {
              state: {
                idestudiante: params.row.idestudiante,
                idreservarentrevista,
              },
            })
          }
        >
          Crear
        </button>
      ),
    },
  ];
  

  return (
    <>
      <Header title="GESTIÓN DE ACTAS" subtitle="Listado de estudiantes" />
      <div className="form-container">
        <div className="student-search">
          <label htmlFor="search">Ingrese el nombre del estudiante</label>
          <input
            type="text"
            id="search"
            placeholder="Ingrese el Nombre del Estudiante"
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
}

export default ListEstudiantes;
