/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import UnidadMedidaService from "../../services/UnidadMedidaService";
import { useCallback, useEffect, useState } from "react";
import UnidadMedida from "../../types/UnidadMedida";
import { setUnidades } from "../../redux/slices/UnidadMedida";
import { toggleModal } from "../../redux/slices/Modal";
import { handleSearch } from "../../utils/utils";
import { Add } from "@mui/icons-material";
import { Box, Typography, Button, Container, CircularProgress } from "@mui/material";
import React from "react";
import SearchBar from "../common/SearchBar";
import TableComponent from "../Table/Table";
import ModalUnidadMedida from "../Modals/ModalUnidadMedida/ModalUnidadMedida";
import EliminarUnidadMedida from "../Modals/ModalUnidadMedida/EliminarUnidadMedida";


interface Row{
    [key: string]: any;
}

interface Column{
    id: keyof Row;
    label: string;
    renderCell: (rowData: Row) => JSX.Element;
}

export const ListaUnidadMedida = () => {
    const url = import.meta.env.VITE_API_URL;
    const dispatch = useAppDispatch();
    const unidadMedidaService = new UnidadMedidaService();
    const [filterData, setFilterData] = useState<Row[]>([]);
    const [unidadMedidaToEdit, setUnidadMedidaToEdit] = useState<UnidadMedida | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const globalUnidadMedida = useAppSelector((state) => state.unidadMedida.data);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const fetchUnidades = useCallback(async () => {
        try{
            const unidades = await unidadMedidaService.getAll(url + 'unidadMedida', await getAccessTokenSilently({}));
            dispatch(setUnidades(unidades));
            setFilterData(unidades);
            setLoading(false);
          } catch (error) {
            console.error("Error al obtener las unidades de medida:", error);
            setLoading(false);
          }
        }, [dispatch, unidadMedidaService, url]);

    useEffect(() => {
     fetchUnidades();
    }, []);

    const handleAddUnidad = () => {
        setUnidadMedidaToEdit(null);
        dispatch(toggleModal({ modalName: "modal" }));
    };

    const handleOpenEditModal = (rowData: Row) => {
        setUnidadMedidaToEdit({
          id: rowData.id,
          denominacion: rowData.denominacion,
          eliminado: rowData.eliminado
        });
        dispatch(toggleModal({ modalName: 'modal' }));
      };
    
      const onSearch = (query: string) => {
        handleSearch(query, globalUnidadMedida, setFilterData);
      };
    
      const handleOpenDeleteModal = (rowData: Row) => {
        setUnidadMedidaToEdit({
          id: rowData.id,
          denominacion: rowData.denominacion,
          eliminado: rowData.eliminado
        });
        setDeleteModalOpen(true);
      };
    
      const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
      };

      const handleDeleteUnidad = async () => {
        try {
          if (unidadMedidaToEdit && unidadMedidaToEdit.id) {
            await unidadMedidaService.delete(url + 'unidades', unidadMedidaToEdit.id.toString(), await getAccessTokenSilently({}));
            handleCloseDeleteModal();
            fetchUnidades();
          } else {
            console.error('No se puede eliminar la unidad de medida porque no se proporcionó un ID válido.');
          }
        } catch (error) {
          console.error('Error al eliminar la unidad de medida:', error);
        }
      };
    
      const columns: Column[] = [
        // { id: "id", label: "Id", renderCell: (rowData) => <>{rowData.id || ""}</> },
        { id: "denominacion", label: "Denominación", renderCell: (rowData) => <>{rowData.denominacion || ""}</> }
      ];

      return (
        <React.Fragment>
          <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", my: 2 }}>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Unidades de Medida
                </Typography>
                <Button className="btn-primary" variant="contained" startIcon={<Add />} onClick={handleAddUnidad}>
                  Unidad de Medida
                </Button>
              </Box>
    
              <Box sx={{ mb: 2 }}>
                <SearchBar onSearch={onSearch} />
              </Box>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableComponent data={filterData} columns={columns} handleOpenEditModal={handleOpenEditModal} handleOpenDeleteModal={handleOpenDeleteModal} isListaPedidos={false}/>
              )}
    
              <ModalUnidadMedida getUnidades={fetchUnidades} unidadToEdit={unidadMedidaToEdit !== null ? unidadMedidaToEdit : undefined} modalName="modal" />
    
              <EliminarUnidadMedida show={deleteModalOpen} onHide={handleCloseDeleteModal} unidad={unidadMedidaToEdit} onDelete={handleDeleteUnidad} />
            </Container>
          </Box>
        </React.Fragment>
      );
}


