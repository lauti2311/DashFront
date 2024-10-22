/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, Container, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import SearchBar from "../common/SearchBar";
import UsuarioService from "../../services/UsuarioService";
import Usuario from "../../types/Usuario";
import { toggleModal } from "../../redux/slices/Modal";
import ModalUsuario from "../Modals/ModalUsuario/ModalUsuario";
import Eliminarusuario from "../Modals/ModalUsuario/EliminarUsuario";
import TableComponent from "../Table/Table";
import { useParams } from "react-router-dom";
import { handleSearch } from "../../utils/utils";
import React from "react";
import { setUsuario } from "../../redux/slices/UsuarioS";

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

export const ListaUsuarios = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const { sucursalId } = useParams();
  const usuarioService = new UsuarioService();
  const globalUsuario = useAppSelector(
    (state) => state.usuario.data
  );
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null>(null); // Estado para el usuario seleccionado para eliminar

  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal de eliminar
  const [loading, setLoading] = useState(true);


  // Definiendo fetchUsuarios con useCallback
  const fetchUsuarios = useCallback(async () => {
    try {
      const usuarios = await usuarioService.getAll(url + 'usuarios');
      dispatch(setUsuario(usuarios));
      setFilterData(usuarios);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      setLoading(false);
    }
  }, [dispatch, usuarioService, url]);

  useEffect(() => {
    // Llamando a fetchUsuarios dentro de useEffect
    fetchUsuarios();
    onSearch("");
  }, [fetchUsuarios]); // fetchUsuarios se pasa como dependencia

  const handleAddUser = () => {
    setUsuarioToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenEditModal = (rowData: Row) => {
    setUsuarioToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      username: rowData.username,
      email: rowData.email,
      rol: rowData.rol,
      empleado: {
        tipoEmpleado: rowData.rol,
        sucursal: {id: +(sucursalId || 0)}
      }
    });
    dispatch(toggleModal({ modalName: 'modal' }));
  };

  const onSearch = (query: string) => {
    handleSearch(query, globalUsuario, setFilterData);
  };

  const handleOpenDeleteModal = (rowData: Row) => {
    setUsuarioToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      username: rowData.username,
      email: rowData.email,
      rol: rowData.rol,
      empleado: {
        tipoEmpleado: rowData.rol,
        sucursal: {id: +(sucursalId || 0)}
      }
    });
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); // Utiliza el estado directamente para cerrar la modal de eliminación
  };


  // Función para eliminar el usuario
  const handleDeleteUser = async () => {
    try {
      if (usuarioToEdit && usuarioToEdit.id) {
        await usuarioService.delete(url + 'usuarios', usuarioToEdit.id.toString()); // Eliminar el usuario
        console.log('Usuario eliminado correctamente.');
        // Cerrar el modal de eliminar
        handleCloseDeleteModal();
        // Actualizar la lista de usuarios después de la eliminación
        fetchUsuarios();
      } else {
        console.error('No se puede eliminar el usuario porque no se proporcionó un ID válido.');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const columns: Column[] = [
    { id: "id", label: "Id", renderCell: (rowData) => <>{rowData.id || ""}</> },
    { id: "username", label: "Nombre de usuario", renderCell: (rowData) => <>{rowData.username || ""}</> },
    { id: "auth0Id", label: "Auth0Id", renderCell: (rowData) => <>{rowData.auth0Id || ""}</> }
  ];

  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Usuarios
            </Typography>
            <Button
              className="btn-primary"
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddUser}
              style={{ backgroundColor: '#fb6376', borderColor: '#fb6376' }}
            >
              Usuario
            </Button>
          </Box>

          {/* Barra de búsqueda */}
          <Box sx={{ mb: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>

          {/* Tabla de usuarios */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableComponent data={filterData} columns={columns} handleOpenEditModal={handleOpenEditModal} handleOpenDeleteModal={handleOpenDeleteModal} isListaPedidos={false}/>
          )}

          
          {/* Modal de Usuario */}
          <ModalUsuario sucursalId={+(sucursalId || 0)} getUsuarios={fetchUsuarios} usuarioToEdit={usuarioToEdit !== null ? usuarioToEdit : undefined} />

          {/* Modal de Eliminar Usuario */}
          <Eliminarusuario show={deleteModalOpen} onHide={handleCloseDeleteModal} usuario={usuarioToEdit} onDelete={handleDeleteUser} />
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default ListaUsuarios;
