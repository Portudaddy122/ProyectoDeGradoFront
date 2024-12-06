import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useLocation } from 'react-router-dom';
import './ListaActas.css';
import { getActasReunionByEstudiante, updateActaReunion, deleteActaReunion} from '../../service/actas.service.jsx';
import { getEstudianteById } from '../../service/Estudiante.service.jsx';
import Header from '../Header';
import DynamicModelForUsers from '../DynamicModelForUsers.jsx';
import { jsPDF } from 'jspdf';
import { getMotivos } from '../../service/motivo.service.jsx'
import { getMateria } from '../../service/materia.service.jsx'
import Toast from '../Toast.jsx'; // Importa el componente Toast
import exportActas from './exportActas';




const ListaActas = () => {
  const location = useLocation();
  const [actas, setActas] = useState([]);
  const [filteredActas, setFilteredActas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedActa, setSelectedActa] = useState(null);
  const [editedActa, setEditedActa] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [motivos, setMotivos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewActa, setViewActa] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [actaToDelete, setActaToDelete] = useState(null);


  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  // Función para ocultar el Toast
  const hideToast = () => {
    setToast({ show: false, message: '', type: '' });
  };


  useEffect(() => {
    // Obtener las materias desde el backend
    const fetchMaterias = async () => {
      try {
        const response = await getMateria();
        setMaterias(response.data); // Asegúrate de que response.data contenga la lista de materias
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    };

    fetchMaterias();
  }, []);

  // Recuperar el idestudiante del estado pasado al navegar
  const idestudiante = location.state?.idestudiante;

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        if (!idestudiante) {
          console.error('No se proporcionó idestudiante.');
          return;
        }
        const response = await getEstudianteById(idestudiante);
        setEstudiante(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del estudiante:', error);
      }
    };

    const fetchActas = async () => {
      try {
        if (!idestudiante) {
          console.error('No se proporcionó idestudiante.');
          return;
        }
        const response = await getActasReunionByEstudiante(idestudiante);
        const actasFiltradas = response.data.filter((acta) => acta.estado === true);
        setActas(actasFiltradas);
        setFilteredActas(actasFiltradas);
      } catch (error) {
        console.error('Error al obtener las actas del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };


    fetchEstudiante();
    fetchActas();
  }, [idestudiante]);

  useEffect(() => {
    const filtered = actas.filter((acta) =>
      (acta.materia?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (acta.motivo?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (acta.fechadecreacion?.toLowerCase() || "").includes(search.toLowerCase())
    );
    setFilteredActas(filtered);
  }, [search, actas]);



  const handleDelete = async () => {
    try {
      await deleteActaReunion(actaToDelete.idacta);
      showToast('Acta eliminada correctamente', 'success');
      const updatedActas = actas.filter((acta) => acta.idacta !== actaToDelete.idacta);
      setActas(updatedActas);
      setFilteredActas(updatedActas);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error al eliminar el acta:', error);
      showToast('Error al eliminar el acta', 'error');
    }
  };

  const handleEdit = (acta) => {


    const materiaSeleccionada = materias.find((materia) => materia.nombre === acta.materia) || {};
    const motivoSeleccionado = motivos.find((motivo) => motivo.nombremotivo === acta.motivo) || {};

    setEditedActa({
      id: acta.idacta, // Se asegura que el ID sea correcto
      idreservarentrevista: acta.idreservarentrevista,
      idmateria: materiaSeleccionada.idmateria || acta.idmateria,
      idmotivo: motivoSeleccionado.idmotivo || acta.idmotivo,
      fechadecreacion: acta.fechadecreacion,
      descripcion: acta.descripcion,
      estado: acta.estado,
      idestudiante: acta.idestudiante,
    });

    setEditModalOpen(true);
  };

  const handleExportPDF = (acta) => {
    if (!acta || !estudiante) {
      showToast('No se puede exportar el acta. Datos incompletos.', 'error');
      return;
    }
  
    exportActas(acta, estudiante);

  };
  
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedActa((prev) => ({
      ...prev,
      [name]: value, // Actualiza dinámicamente el campo con su nombre
    }));
  };


  const saveEditedActa = async () => {
    try {
      const updatedActaData = {
        idreservarentrevista: editedActa.idreservarentrevista,
        idmotivo: editedActa.idmotivo,
        descripcion: editedActa.descripcion.trim(),
        fechadecreacion: editedActa.fechadecreacion,
        estado: editedActa.estado ?? true,
        idmateria: editedActa.idmateria,
        idestudiante: editedActa.idestudiante,
      };



      await updateActaReunion(editedActa.id, updatedActaData);


      // Refrescar las actas desde el backend
      const response = await getActasReunionByEstudiante(idestudiante);
      const actasFiltradas = response.data.filter((acta) => acta.estado === true);

      setActas(actasFiltradas); // Actualiza el estado global de actas
      setFilteredActas(actasFiltradas); // Actualiza el estado filtrado

      setEditModalOpen(false); // Cierra el modal
      showToast("Acta actualizada correctamente", "success"); // Muestra mensaje de éxito
    } catch (error) {
      console.error("Error al actualizar el acta:", error);
      showToast("Error al actualizar el acta", "error"); // Muestra mensaje de error
    }
  };



  const handleView = (acta) => {
    setViewActa(acta); // Guarda los datos del acta seleccionada
    setViewModalOpen(true); // Abre el modal de visualización
  };






  useEffect(() => {
    // Obtener los motivos desde el backend
    const fetchMotivos = async () => {
      try {
        const response = await getMotivos();
        setMotivos(response.data); // Asegúrate de que response.data contenga la lista de motivos
      } catch (error) {
        console.error("Error al obtener los motivos:", error);
      }
    };

    fetchMotivos();
  }, []);



  const columns = [
    { field: 'materia', headerName: 'Materia', flex: 1 },
    { field: 'motivo', headerName: 'Motivo', flex: 1 },
    { field: 'fechadecreacion', headerName: 'Fecha', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 2,
      renderCell: (params) => (
        <div className="action-buttons">
          <button
            className="action-btn view-btn"
            onClick={() => handleView(params.row)}
          >
            Ver
          </button>
          <button
            className="action-btn edit-btn"
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </button>
          

          <button
            className="action-btn delete-btn"
            onClick={() => {
              setActaToDelete(params.row);
              setDeleteModalOpen(true);
            }}
          >
            Eliminar
          </button>
          <button
  className="action-btn export-btn"
  onClick={() => handleExportPDF(params.row)}
>
  Exportar PDF
</button>


        </div>
      ),
    },
  ];

  return (
    <>
      <Header title="LISTA DE ACTAS" subtitle="Lista de las Actas del estudiante seleccionado" />
      <div className="lista-actas-container">
        <div className="search-bar">
          <TextField
            label="Buscar"
            variant="outlined"
            fullWidth
            placeholder="Buscar por materia, motivo o fecha"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Paper className="data-grid-container">
          {loading ? (
            <p>Cargando actas...</p>
          ) : (
            <DataGrid
              rows={filteredActas.map((acta) => ({
                id: acta.idacta,
                idacta: acta.idacta,
                materia: acta.materia,
                motivo: acta.motivo,
                fechadecreacion: acta.fechadecreacion,
                descripcion: acta.descripcion,
                idreservarentrevista: acta.idreservarentrevista,
                idestudiante: idestudiante,
              }))}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              autoHeight
              disableSelectionOnClick
            />
          )}
        </Paper>
      </div>
      {viewModalOpen && viewActa && (
        <DynamicModelForUsers
          isOpen={viewModalOpen}
          title="Detalles del Acta"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p><strong>Materia:</strong> {viewActa.materia}</p>
              <p><strong>Motivo:</strong> {viewActa.motivo}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(viewActa.fechadecreacion).toLocaleDateString()}</p>
              <p><strong>Descripción:</strong> {viewActa.descripcion}</p>
            </div>
          }
          onClose={() => setViewModalOpen(false)} // Cierra el modal
        />
      )}

      

      {editModalOpen && editedActa && (
        <DynamicModelForUsers
          isOpen={editModalOpen}
          title="Editar Acta"
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <label>Materia</label>
              <select
                name="idmateria"
                value={editedActa?.idmateria || ''}
                onChange={(e) =>
                  setEditedActa((prev) => ({
                    ...prev,
                    idmateria: parseInt(e.target.value, 10),
                  }))
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                }}
              >
                <option value="">Selecciona la materia</option>
                {materias.map((materia) => (
                  <option key={materia.idmateria} value={materia.idmateria}>
                    {materia.nombre}
                  </option>
                ))}
              </select>

              

              <label>Motivo</label>
              <select
                name="idmotivo"
                value={editedActa?.idmotivo || ''}
                onChange={(e) =>
                  setEditedActa((prev) => ({
                    ...prev,
                    idmotivo: parseInt(e.target.value, 10),
                  }))
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                }}
              >
                <option value="">Selecciona el motivo</option>
                {motivos.map((motivo) => (
                  <option key={motivo.idmotivo} value={motivo.idmotivo}>
                    {motivo.nombremotivo}
                  </option>
                ))}
              </select>
              <TextField
                label="Fecha de Creación"
                name="fechadecreacion"
                type="date"
                value={editedActa.fechadecreacion.split('T')[0]}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled
              />
              <TextField
                label="Descripción"
                name="descripcion"
                value={editedActa.descripcion}
                onChange={(e) =>
                  setEditedActa((prev) => ({
                    ...prev,
                    descripcion: e.target.value,
                  }))
                }
                multiline
                rows={4}
                fullWidth
              />
            </div>
          }
          onClose={() => setEditModalOpen(false)}
          onSave={saveEditedActa}
          onCancel={() => setEditModalOpen(false)}
        />
      )}
{deleteModalOpen && (
        <DynamicModelForUsers
          isOpen={deleteModalOpen}
          title="Confirmar eliminación"
          content={
            <p>
              ¿Está seguro de eliminar el acta <strong>{actaToDelete.materia}</strong>?
            </p>
          }
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          showDescription={false}
        />
      )}

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );

};

export default ListaActas;
