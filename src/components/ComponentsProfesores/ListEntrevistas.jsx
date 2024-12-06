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
import { useNavigate } from 'react-router-dom';
import { obtenerListaEntrevista, eliminarEntrevista } from '../../service/teoriaDeColas.service.jsx';
import Header from '../Header.jsx';
import iconcheck from '../../assets/icons/check.svg';
import icondelete from '../../assets/icons/delete.svg';


const ListEntrevistas = () => {
    const [entrevistas, setEntrevistas] = useState([]);
    const [fechaFiltro] = useState(new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(false);
    const [selectedEntrevista, setSelectedEntrevista] = useState(null);
    const [actionType, setActionType] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    // Obtener la lista de entrevistas
    const fetchEntrevistas = async () => {
        try {
            const response = await obtenerListaEntrevista();
            const today = new Date().toISOString().split('T')[0];
            const entrevistasFiltradas = response.data.filter(ent => {
                const fechaEntrevista = new Date(ent.fecha).toISOString().split('T')[0];
                return fechaEntrevista === today;
            });
            setEntrevistas(entrevistasFiltradas);
        } catch (error) {
            console.error("Error al obtener las entrevistas:", error);
        }
    };
    

    useEffect(() => {
        fetchEntrevistas();
    }, [fechaFiltro]);

    // Función para manejar la acción de completar/cancelar
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
            console.error(`Error al ${actionType.toLowerCase()} la entrevista:`, error);
        } finally {
            setLoading(false);
            setModalOpen(false);
            setSelectedEntrevista(null);
        }
    };

    const openModal = (entrevista, action) => {
        setSelectedEntrevista(entrevista);
        setActionType(action);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedEntrevista(null);
    };

    const getEstadoColor = (estado) => {
        if (estado === null) return 'orange';
        return estado ? 'green' : 'red';
    };

    const formatEstado = (estado) => {
        if (estado === null) return 'Pendiente';
        return estado ? 'Completado' : 'No realizado';
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Header title="GESTION DE ENTREVISTAS" subtitle="Listado de entrevistas para el dia de hoy" />
            <div className="entrevistas-container">
                <div className="header-actions">
                    <TextField
                        label="Fecha"
                        type="date"
                        value={fechaFiltro}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ readOnly: true }}
                    />
                    <ExportActions data={entrevistas} context="entrevistas" selectedDate={fechaFiltro} />
                </div>
                <Paper className="table-container">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Orden de cola</TableCell>
                                    <TableCell>Nombres</TableCell>
                                    <TableCell>Apellido Paterno</TableCell>
                                    <TableCell>Apellido Materno</TableCell>
                                    <TableCell>Correo</TableCell>
                                    <TableCell>Hora</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                    <TableCell>Crear Acta</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
    {entrevistas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ent, index) => (
        <TableRow key={ent.idreservarentrevista}>
            <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
            <TableCell>{ent.nombres}</TableCell>
            <TableCell>{ent.apellidopaterno}</TableCell>
            <TableCell>{ent.apellidomaterno}</TableCell>
            <TableCell>{ent.email}</TableCell>
            {/* Mostrar la nueva hora calculada */}
            <TableCell>{ent.nuevaHorafinEntrevista || 'No disponible'}</TableCell>
            <TableCell style={{ color: getEstadoColor(ent.estado) }}>
                {formatEstado(ent.estado)}
            </TableCell>
            <TableCell>
                {formatEstado(ent.estado) === 'Pendiente' && (
                    <div className="action-buttons">
                        <button className='action-btn complete-btn' onClick={() => openModal(ent, 'Completado')} disabled={loading}>
                            <img src={iconcheck} alt="Completado" />
                        </button>
                        <button className='action-btn cancel-btn-entrevista' onClick={() => openModal(ent, 'No realizado')} disabled={loading}>
                            <img src={icondelete} alt="No realizado" />
                        </button>
                    </div>
                )}
            </TableCell>
            <TableCell>
    {formatEstado(ent.estado) === 'Pendiente' ? (
        <button
            className='action-btn create-acta-btn'
            onClick={() => navigate('/crearActa', { state: { idreservarentrevista: ent.idreservarentrevista } })}
            disabled={loading}
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
                    onCancel={handleCloseModal}
                />
            </div>
        </>
    );
};

export default ListEntrevistas;
