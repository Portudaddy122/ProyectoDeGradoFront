import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import BtnActionsText from "./botones/BtnActionsText";
import "./UserTable.css";
import ExportActions from "./ExportActions";

const UserTable = ({ users, onView, onEdit, onDelete, onCite, hideDefaultActions }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };
  

  const filteredUsers = users.filter((user) =>
    user.nombres.toLowerCase().includes(filter) ||
    user.apellidopaterno.toLowerCase().includes(filter) ||
    user.apellidomaterno.toLowerCase().includes(filter) ||
    user.rol.toLowerCase().includes(filter)
  );

  return (
    <Paper sx={{ width: "99%", overflow: "hidden", border: "2px solid black", marginLeft: "5%", height: 'auto', fontFamily: "Kumbh Sans" }}>
      <div className="search-and-export">
        <TextField
          label="Buscar"
          variant="outlined"
          fullWidth
          onChange={handleFilterChange}
          placeholder="Buscar por nombre, apellido o rol"
          style={{ margin: "10px", border: '2px solid black', borderRadius: "8px" }}
        />
        <ExportActions />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellido Paterno</TableCell>
              <TableCell>Apellido Materno</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f1f1f1',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <TableCell>{user.nombres}</TableCell>
                  <TableCell>{user.apellidopaterno}</TableCell>
                  <TableCell>{user.apellidomaterno}</TableCell>
                  <TableCell>{user.rol}</TableCell>
                  <TableCell>
                    <section className="btn-actions">
                      {/* Botones predeterminados: Ver, Editar, Eliminar */}
                      {!hideDefaultActions && (
                        <>
                          {onView && (
                            <BtnActionsText
                              color="green"
                              text="Ver"
                              onClick={() => onView(user)}
                            />
                          )}
                          {onEdit && (
                            <BtnActionsText
                              color="yellow"
                              text="Editar"
                              onClick={() => onEdit(user)}
                            />
                          )}
                          {onDelete && (
                            <BtnActionsText
                              color="red"
                              text="Eliminar"
                              onClick={() => onDelete(user)}
                            />
                          )}
                        </>
                      )}

                      {/* Botón personalizado: Citar */}
                      {onCite && (
                        <BtnActionsText
                          color="blue"
                          text="Citar"
                          onClick={() => onCite(user)}
                        />
                      )}
                    </section>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default UserTable;
