import React, { useEffect, useState, useContext } from 'react';
import { getUsuariosConIngresos } from '../service/users.service.jsx';
import ExportActions from './ExportActions';
import './ControlIngresos.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import Header from './Header';
import AuthContext from '../auth.jsx';

const ControlIngresos = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Obtener datos de los usuarios con ingresos desde el backend
  useEffect(() => {
    const fetchUsuariosConIngresos = async () => {
      try {
        const response = await getUsuariosConIngresos(token);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios con ingresos:', error);
      }
    };

    fetchUsuariosConIngresos();
  }, [token]);

  // Filtrar los datos por el término de búsqueda
  const filteredData = data.filter((item) => {
    const nombreCompleto = item.nombrecompleto || '';
    const fechaIngreso = item.fechaingreso?.split('T')[0] || '';
    const rol = item.rol || '';
    const horaIngreso = item.horaingreso || '';

    return (
      nombreCompleto.toLowerCase().includes(searchValue.toLowerCase()) ||
      fechaIngreso.includes(searchValue) ||
      rol.toLowerCase().includes(searchValue.toLowerCase()) ||
      horaIngreso.includes(searchValue)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="control-ingresos-container">
      <Header title="Gestión de Usuarios con Ingresos" subtitle="Control de Ingresos Registrados" />
      <div className="control-ingresos-header-container">
        <div className="control-ingresos-header">
          <label htmlFor="searchInput" className="control-ingresos-label">
            Ingrese un término de búsqueda
          </label>
          <input
            id="searchInput"
            type="text"
            className="control-ingresos-input"
            value={searchValue}
            placeholder="Buscar por nombre, rol, fecha, hora, etc."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="control-ingresos-export-actions">
          {/* Enviar todos los datos originales al componente ExportActions */}
          <ExportActions
            data={data} // Todos los datos
            context="ingresos"
            title="Control de Usuarios con Ingresos"
          />
        </div>
      </div>

      <Paper className="control-ingresos-table-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="control-ingresos-table-header">Nombre Completo</TableCell>
                <TableCell className="control-ingresos-table-header">Rol</TableCell>
                <TableCell className="control-ingresos-table-header">Fecha de Ingreso</TableCell>
                <TableCell className="control-ingresos-table-header">Hora de Ingreso</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="control-ingresos-table-cell">{item.nombrecompleto || 'Sin registro'}</TableCell>
                    <TableCell className="control-ingresos-table-cell">{item.rol || 'Sin registro'}</TableCell>
                    <TableCell className="control-ingresos-table-cell">{item.fechaingreso?.split('T')[0] || 'Sin registro'}</TableCell>
                    <TableCell className="control-ingresos-table-cell">{item.horaingreso || 'Sin registro'}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="control-ingresos-pagination"
        />
      </Paper>
    </div>
  );
};

export default ControlIngresos;
