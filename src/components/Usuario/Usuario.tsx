/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, Container, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import TableComponent, { ModalContext} from "../Table/Table";
import SearchBar from "../common/SearchBar";
import UsuarioService from "../../services/UsuarioService";
import Usuario from "../../types/Usuario";
import { toggleModal } from "../../redux/slices/Modal";
import { setUser } from "../../redux/slices/UsuarioS";
import ModalUsuario from "../Modals/ModalUsuario";
import Eliminarusuario from "../Modals/EliminarUsuario";

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
  const usuarioService = new UsuarioService();
  // Estado global de Redux
  const globalUsuario = useAppSelector(
    (state) => state.usuario.usuario
  );
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null>(null); // Estado para el usuario seleccionado para eliminar

  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para controlar la apertura y cierre del modal de eliminar
  const [loading, setLoading] = useState(true);


  // Definiendo fetchUsuarios con useCallback
  const fetchUsuarios = useCallback(async () => {
    try {
      const usuarios = await usuarioService.getAll(url + 'usuarios');
      dispatch(setUser(usuarios));
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
  }, [fetchUsuarios]); // fetchUsuarios se pasa como dependencia

  const handleAddUser = () => {
    setUsuarioToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenEditModal = (rowData: Row) => {
    setUsuarioToEdit({
      id: rowData.id,
      auth0Id: rowData.auth0Id,
      username: rowData.username
    });
    dispatch(toggleModal({ modalName: 'modal' }));
  };
  const handleSearch = (query: string) => {
    const filtered = globalUsuario.filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilterData(filtered);
  };

  const handleOpenDeleteModal = (rowData: Row) => {
    setUsuarioToEdit({
      id: rowData.id,
      auth0Id: rowData.auth0Id,
      username: rowData.username
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
        await usuarioService.delete(url + 'usuarios', usuarioToEdit.id.toString());
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
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Usuarios
          </Typography>
          <Button
            sx={{
              bgcolor: "#cc5533",
              "&:hover": {
                bgcolor: "#b23e1f",
              },
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddUser}
          >
            User
          </Button>
        </Box>


        <Box sx={{ mb: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>


        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
            <ModalContext.Provider value={{ handleOpenEditModal, handleOpenDeleteModal }}>
            <TableComponent data={filterData} columns={columns} />
            {/* Modales */}
            <ModalUsuario getUsuarios={fetchUsuarios} usuarioToEdit={usuarioToEdit !== null ? usuarioToEdit : undefined} />
            <Eliminarusuario show={deleteModalOpen} onHide={handleCloseDeleteModal} usuario={usuarioToEdit} onDelete={handleDeleteUser} />
          </ModalContext.Provider>
        )}
      </Container>
    </Box>
  );
}

export default ListaUsuarios;
