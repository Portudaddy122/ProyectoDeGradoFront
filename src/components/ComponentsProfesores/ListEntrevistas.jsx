import React, { useState, useEffect } from 'react';
import './ListEntrevistas.css';
import ExportActions from '../ExportActions.jsx';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import DynamicModelForUsers from '../DynamicModelForUsers.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerColaEsperaPrioridadFIFO, obtenerListaEntrevistaPorFecha, eliminarEntrevista } from '../../service/teoriaDeColas.service.jsx';
import Header from '../Header.jsx';
import iconcheck from '../../assets/icons/check.svg';
import icondelete from '../../assets/icons/delete.svg';

// Importar el componente Toast
import Toast from '../Toast.jsx';

const ListEntrevistas = () => {
    const [entrevistas, setEntrevistas] = useState([]);
    const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(false);
    const [selectedEntrevista, setSelectedEntrevista] = useState(null);
    const [actionType, setActionType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState('');
    const [idProfesor, setIdProfesor] = useState(null);
    const [idPsicologo, setIdPsicologo] = useState(null);

    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const location = useLocation();

    // Obtener el id del profesor o psicólogo desde la ubicación
    useEffect(() => {
        const { idProfesor, idPsicologo } = location.state || {};
        setIdProfesor(idProfesor);
        setIdPsicologo(idPsicologo);
    }, [location.state]);

    // Obtener la lista de entrevistas del día actual
    const fetchEntrevistasHoy = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('user'));
            console.log("Usuario logueado desde localStorage:", usuario);

            const idhorario = usuario?.idhorario;
            if (!idhorario) {
                setErrorMessage("El usuario no tiene idhorario definido.");
                setErrorType('error');
                return;
            }

            console.log("IDHorario enviado al backend:", idhorario);

            const response = await obtenerColaEsperaPrioridadFIFO({ idhorario });
            console.log("Respuesta completa del backend:", response.data);

            setEntrevistas(response.data);
        } catch (error) {
            setErrorMessage('Error al obtener las entrevistas del día actual.');
            setErrorType('error');
            console.error('Error al obtener las entrevistas del día actual:', error);
        }
    };

    // Obtener la lista de entrevistas según la fecha seleccionada
    const fetchEntrevistasPorFecha = async (fecha) => {
        try {
            const usuario = JSON.parse(localStorage.getItem('user'));
            const idProfesor = usuario.role === 'Profesor' ? usuario.id : null;
            const idPsicologo = usuario.role === 'Psicologo' ? usuario.id : null;

            console.log(`Solicitando entrevistas para fecha ${fecha} con IDProfesor: ${idProfesor}, IDPsicologo: ${idPsicologo}`);

            // Llamar al servicio con los parámetros
            const response = await obtenerListaEntrevistaPorFecha(fecha, idProfesor, idPsicologo);
            console.log("Entrevistas obtenidas por fecha del backend:", response.data);
            setEntrevistas(response.data);
        } catch (error) {
            setErrorMessage('Error al obtener las entrevistas por fecha.');
            setErrorType('error');
            console.error("Error al obtener las entrevistas por fecha:", error);
        }
    };





    const handleFechaChange = (event) => {
        const selectedDate = event.target.value;
        setFechaFiltro(selectedDate);

        if (selectedDate === new Date().toISOString().split("T")[0]) {
            fetchEntrevistasHoy();
        } else {
            fetchEntrevistasPorFecha(selectedDate);
        }
    };

    const handleConfirmAction = async () => {
        if (!selectedEntrevista) return;
        const { idreservarentrevista } = selectedEntrevista;
        const nuevoEstado = actionType === 'Completado' ? 'completado' : 'cancelado';

        setLoading(true);
        try {
            const response = await eliminarEntrevista(idreservarentrevista, nuevoEstado);

            if (response.status === 200) {
                setEntrevistas(prevEntrevistas =>
                    prevEntrevistas.map(ent =>
                        ent.idreservarentrevista === idreservarentrevista
                            ? { ...ent, estado: nuevoEstado === 'completado' ? true : false }
                            : ent
                    )
                );
            }
        } catch (error) {
            setErrorMessage(`Error al ${actionType.toLowerCase()} la entrevista.`);
            setErrorType('error');
            console.error(`Error al ${actionType.toLowerCase()} la entrevista:`, error);
        } finally {
            setLoading(false);
            setModalOpen(false);
            setSelectedEntrevista(null);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openModal = (entrevista, action) => {
        setSelectedEntrevista(entrevista);
        setActionType(action);
        setModalOpen(true);
    };

    const getEstadoColor = (estado) => {
        if (estado === null) return 'orange';
        return estado ? 'green' : 'red';
    };

    const formatEstado = (estado) => {
        if (estado === null) return 'Pendiente';
        return estado ? 'Completado' : 'No realizado';
    };
    const exportEntrevistas = entrevistas.map((ent) => ({
        Nombre: ent.nombre_completo || 'Sin registro',
        Correo: ent.email || 'Sin registro',
        'Hora Inicio': ent.horainicio || 'Sin registro',
        'Hora Fin': ent.horafin || 'Sin registro',
        Motivo: ent.motivo || 'Sin registro',
        Prioridad: ent.prioridad || 'Sin registro',
        Estado: ent.estado === null ? 'Pendiente' : ent.estado ? 'Completado' : 'No realizado',
    }));
    
    return (
        <>
            <Header title="GESTIÓN DE ENTREVISTAS" subtitle="Listado de entrevistas según la prioridad o la fecha seleccionada" />
            <div className="entrevistas-container">
                <div className="header-actions">
                    <TextField
                        label="Fecha"
                        type="date"
                        value={fechaFiltro}
                        onChange={handleFechaChange}
                        InputLabelProps={{ shrink: true }}
                    />
                 <ExportActions
  data={entrevistas.map((ent) => ({
    ...ent,
    estado: ent.estado === null ? 'Pendiente' : ent.estado ? 'Completado' : 'No realizado',
  }))}
  context="Listado de Entrevistas"
  selectedDate={fechaFiltro}
  title="Listado de Entrevistas"
  columns={[
    { title: 'Orden de cola', field: 'idreservarentrevista' },
    { title: 'Nombre Completo', field: 'nombre_completo' },
    { title: 'Correo', field: 'email' },
    { title: 'Hora Inicio', field: 'horainicio' },
    { title: 'Hora Fin', field: 'horafin' },
    { title: 'Motivo', field: 'motivo' },
    { title: 'Prioridad', field: 'prioridad' },
    { title: 'Estado', field: 'estado' },
  ]}
/>

                </div>

                {/* Mostrar Toast si hay errores */}
                {errorMessage && <Toast message={errorMessage} type={errorType} onClose={() => setErrorMessage('')} />}

                <Paper className="table-container">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Orden de cola</TableCell>
                                    <TableCell>Nombre Completo</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Hora Inicio</TableCell>
                                    <TableCell>Hora Fin</TableCell>
                                    <TableCell>Motivo</TableCell>
                                    <TableCell>Prioridad</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                    <TableCell>Crear Acta</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {entrevistas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ent, index) => (
                                    <TableRow key={ent.idreservarentrevista}>
                                        <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                        <TableCell>{ent.nombre_completo}</TableCell>
                                        <TableCell>{ent.email}</TableCell>
                                        <TableCell>{ent.horainicio}</TableCell>
                                        <TableCell>{ent.horafin}</TableCell>
                                        <TableCell>{ent.motivo}</TableCell>
                                        <TableCell>{ent.prioridad}</TableCell>
                                        <TableCell style={{ color: getEstadoColor(ent.estado) }}>
                                            {formatEstado(ent.estado)}
                                        </TableCell>
                                        <TableCell>
                                            {formatEstado(ent.estado) === 'Pendiente' && (
                                                <div className="action-buttons">
                                                    <button
                                                        className="action-btn complete-btn"
                                                        onClick={() => openModal(ent, 'Completado')}
                                                    >
                                                        <img src={iconcheck} alt="Completado" />
                                                    </button>
                                                    <button
                                                        className="action-btn cancel-btn-entrevista"
                                                        onClick={() => openModal(ent, 'No realizado')}
                                                    >
                                                        <img src={icondelete} alt="No realizado" />
                                                    </button>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {formatEstado(ent.estado) === 'Pendiente' ? (
                                                <button
                                                    className="action-btn create-acta-btn"
                                                    onClick={() => navigate('/crearActa', { state: { idreservarentrevista: ent.idreservarentrevista } })}
                                                >
                                                    Ir
                                                </button>
                                            ) : (
                                                <span>Acta cerrada</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={entrevistas.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Paper>
                <DynamicModelForUsers
                    isOpen={modalOpen}
                    title={`¿Estás seguro que deseas ${actionType.toLowerCase()} esta entrevista?`}
                    onConfirm={handleConfirmAction}
                    onCancel={() => setModalOpen(false)}
                />
            </div>
        </>
    );
};

export default ListEntrevistas;
