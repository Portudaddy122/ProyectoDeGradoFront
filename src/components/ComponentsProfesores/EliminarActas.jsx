import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './EliminarActas.css';
import { getInactivasActas, activateActaReunion } from '../../service/actas.service';
import Header from '../Header';
import DynamicModelForUsers from '../DynamicModelForUsers.jsx';

const EliminarActas = () => {
  const [actas, setActas] = useState([]);
  const [filteredActas, setFilteredActas] = useState([]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActa, setSelectedActa] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActas = async () => {
      try {
        const response = await getInactivasActas();
        setActas(response); // Asegúrate de que response contiene las actas con los campos materia y motivo
        setFilteredActas(response);
      } catch (error) {
        console.error('Error al obtener las actas inactivas:', error);
      }
    };

    fetchActas();
  }, []);

  const handleOpenDialog = (acta) => {
    setSelectedActa(acta);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedActa(null);
  };

  const handleActivate = async () => {
    try {
      if (selectedActa) {
        await activateActaReunion(selectedActa.idacta);
        const updatedActas = actas.filter((acta) => acta.idacta !== selectedActa.idacta);
        setActas(updatedActas);
        setFilteredActas(updatedActas);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error al activar el acta:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = actas.filter(
      (acta) =>
        acta.materia.toLowerCase().includes(value) ||
        acta.motivo.toLowerCase().includes(value) ||
        new Date(acta.fechadecreacion).toLocaleDateString().includes(value)
    );
    setFilteredActas(filtered);
  };

  const columns = [
    { field: 'materia', headerName: 'Materia', flex: 1 },
    { field: 'motivo', headerName: 'Motivo', flex: 1 },
    { field: 'fechadecreacion', headerName: 'Fecha', flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 1,
      renderCell: (params) => (
        <button
          className="action-btn activate-btn"
          onClick={() => handleOpenDialog(params.row)}
        >
          Activar
        </button>
      ),
    },
  ];

  return (
    <>
      <Header title="GESTION DE ACTAS" subtitle="Lista de actas desactivadas" />
      <div className="eliminar-actas-container">
        <header className="header">
          <TextField
            label="Escriba el nombre del estudiante"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
            className="search-bar"
          />
        </header>
        <Paper className="data-grid-container">
          <DataGrid
            rows={filteredActas.map((acta) => ({
              id: acta.idacta,
              idacta: acta.idacta,
              materia: acta.materia || 'Sin materia', // Verifica si existe materia
              motivo: acta.motivo || 'Sin motivo', // Verifica si existe motivo
              fechadecreacion: new Date(acta.fechadecreacion).toLocaleDateString(),
            }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
            disableSelectionOnClick
          />
        </Paper>
      </div>

      {dialogOpen && selectedActa && (
        <DynamicModelForUsers
          isOpen={dialogOpen}
          title="Reactivar Acta"
          content={
            <div>
              <p>
                ¿Estás seguro de que deseas reactivar la acta de <strong>{selectedActa.materia}</strong> con el motivo{' '}
                <strong>{selectedActa.motivo}</strong>?
              </p>
            </div>
          }
          onClose={handleCloseDialog}
          onConfirm={handleActivate}
        />
      )}
    </>
  );
};

export default EliminarActas;
