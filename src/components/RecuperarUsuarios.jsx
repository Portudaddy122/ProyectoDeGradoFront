import React, { useState, useEffect } from "react";
import "./RecuperarUsuarios.css";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import CheckIcon from "../../src/assets/icons/check.svg";
import SearchIcon from "../../src/assets/icons/search.svg";
import { listarUsuariosInactivos, activarUsuario } from "../service/users.service";
import Header from "./Header";
import Toast from "./Toast";

const RecuperarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [toast, setToast] = useState({ message: "", type: "", show: false });

  useEffect(() => {
    const fetchUsuariosInactivos = async () => {
      try {
        setLoading(true);
        const data = await listarUsuariosInactivos();
        setUsuarios(data);
        setLoading(false);
      } catch (error) {
        setToast({ message: "Error al listar usuarios inactivos", type: "error", show: true });
        console.error("Error al listar usuarios inactivos:", error);
        setLoading(false);
      }
    };

    fetchUsuariosInactivos();
  }, []);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleActivate = async (id, rol) => {
    try {
      await activarUsuario(id, rol);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((usuario) => usuario.id !== id)
      );
      setToast({ message: "Usuario activado exitosamente", type: "success", show: true });
    } catch (error) {
      setToast({ message: "Error al activar el usuario. Intente nuevamente.", type: "error", show: true });
      console.error("Error al activar usuario:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    const searchTerm = filter.toLowerCase();
    return (
      usuario.nombres.toLowerCase().includes(searchTerm) ||
      usuario.apellidopaterno.toLowerCase().includes(searchTerm) ||
      usuario.apellidomaterno.toLowerCase().includes(searchTerm) ||
      usuario.rol.toLowerCase().includes(searchTerm)
    );
  });

  const closeToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <>
      <Header title={"Gestión de Usuarios"} subtitle={"Recuperación de Usuarios"} />
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      <div className="ReUsuariosApp-container">
        <div className="ReUsuariosApp-search-container">
          <TextField
            label="Buscar por cualquier campo"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleSearch}
            className="ReUsuariosApp-search-field"
          />
          <button className="ReUsuariosApp-icon-button">
            <img src={SearchIcon} alt="Buscar" />
          </button>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Paper className="ReUsuariosApp-table-container">
            <TableContainer>
              <Table className="ReUsuariosApp-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido Paterno</TableCell>
                    <TableCell>Apellido Materno</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsuarios
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>{usuario.nombres}</TableCell>
                        <TableCell>{usuario.apellidopaterno}</TableCell>
                        <TableCell>{usuario.apellidomaterno}</TableCell>
                        <TableCell>{usuario.rol}</TableCell>
                        <TableCell>
                          <button
                            className="ReUsuariosApp-action-button ReUsuariosApp-green-button"
                            onClick={() => handleActivate(usuario.id, usuario.rol)}
                          >
                            <img src={CheckIcon} alt="Activar" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredUsuarios.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: "center" }}>
                        No se encontraron usuarios inactivos.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredUsuarios.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
              labelRowsPerPage="Filas por página"
            />
          </Paper>
        )}
      </div>
    </>
  );
};

export default RecuperarUsuarios;
