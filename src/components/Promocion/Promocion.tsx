/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";

import { useParams } from "react-router-dom";
import PromocionService from "../../services/PromocionService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Promocion from "../../types/Promocion";
import { setPromocion } from "../../redux/slices/Promocion";
import { toggleModal } from "../../redux/slices/Modal";
import { handleSearch } from "../../utils/utils";
import SearchBar from "../common/SearchBar";
import TableComponent from "../Table/Table";
import ModalEliminarPromocion from "../Modals/ModalPromocion/EliminarPromocion";
import ModalPromocion from "../Modals/ModalPromocion/ModalPromocion";

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

export const ListaPromocion = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const promocionService = new PromocionService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [promocionToEdit, setPromocionToEdit] = useState<Promocion | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const globalPromocion = useAppSelector(
    (state) => state.promocion.data
  );
  const { sucursalId } = useParams(); // Obtén el ID de la sucursal de la URL


// Función para abrir la modal de eliminación
const handleOpenDeleteModal = (rowData: Row) => {
  setPromocionToEdit({
    id: rowData.id,
    eliminado: rowData.eliminado,
    denominacion: rowData.denominacion,
    horaDesde: rowData.horaDesde,
    horaHasta: rowData.horaHasta,
    fechaDesde: rowData.fechaDesde,
    fechaHasta: rowData.fechaHasta,
    descripcionDescuento: rowData.descripcionDescuento,
    precioPromocional: rowData.precioPromocional,
    tipoPromocion: rowData.tipoPromocion,
    imagenes: rowData.imagenes,
    sucursales: rowData.sucursales,
    promocionDetalle: rowData.promocionDetalle
    });
  setDeleteModalOpen(true); // Utiliza el estado directamente para abrir la modal de eliminación
};
  const handleDelete = async () => {
    try {
      if (promocionToEdit && promocionToEdit.id) {
        await promocionService.delete(url + 'promociones', promocionToEdit.id.toString());
        console.log('Se ha eliminado correctamente.');
        handleCloseDeleteModal();
        setFilterData(prevData => prevData.filter(promo => promo.id !== promocionToEdit.id)); // Eliminar de filterData
      }
    } catch (error) {
      console.error('Error al eliminar la promocion:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); // Utiliza el estado directamente para cerrar la modal de eliminación
  };

   // Definiendo fetchSucursal con useCallback
   const fetchPromocion = useCallback(async () => {
    try { 
      // Si hay una sucursal seleccionada, filtrar las promociones por la sucursal
      if (sucursalId) {
        
        const sucursalIdNumber = parseInt(sucursalId);

        const promociones = await promocionService.promocionesSucursal(url, sucursalIdNumber);
        // Actualizar el estado con las promociones 
        dispatch(setPromocion(promociones));
        setFilterData(promociones);
      } 
  
    } catch (error) {
      console.error("Error al obtener las promociones:", error);
    }
  }, [dispatch, promocionService, sucursalId, url]);
  
  
  useEffect(() => {
    fetchPromocion();
    onSearch(""); // Llamada a onSearch para filtrar los datos iniciales
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPromocion = () => {
    // Reset promocionToEdit to null when adding a new cupon
    setPromocionToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

   // Función para abrir la modal de edición
// Definición de handleOpenEditModal
const handleOpenEditModal = (rowData: Row) => {
  setPromocionToEdit({
    id: rowData.id,
    eliminado: rowData.eliminado,
    denominacion: rowData.denominacion,
    horaDesde: rowData.horaDesde,
    horaHasta: rowData.horaHasta,
    fechaDesde: rowData.fechaDesde,
    fechaHasta: rowData.fechaHasta,
    descripcionDescuento: rowData.descripcionDescuento,
    precioPromocional: rowData.precioPromocional,
    tipoPromocion: rowData.tipoPromocion,
    imagenes: rowData.imagenes,
    sucursales: rowData.sucursales,
    promocionDetalle: rowData.promocionDetalle
  });
  dispatch(toggleModal({ modalName: 'modal' }));
};

const onSearch = (query: string) => {
  handleSearch(query, globalPromocion,  setFilterData);
};
  const columns: Column[] = [
    // { id: "id", label: "Id", renderCell: (rowData) => <>{rowData.id}</> },
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    { id: "horaDesde", label: "Hora Desde", renderCell: (rowData) => <>{rowData.horaDesde}</> },
    { id: "horaHasta", label: "Hora Hasta", renderCell: (rowData) => <>{rowData.horaHasta}</> },
    { id: "fechaDesde", label: "Fecha Desde", renderCell: (rowData) => <>{rowData.fechaDesde}</> },
    { id: "fechaHasta", label: "Fecha Hasta", renderCell: (rowData) => <>{rowData.fechaHasta}</> },
    { id: "descripcionDescuento", label: "Descripcion Descuento", renderCell: (rowData) => <>{rowData.descripcionDescuento}</> },
    { id: "precioPromocional", label: "Precio Promocional", renderCell: (rowData) => <>{rowData.precioPromocional}</> },
    { id: "tipoPromocion", label: "Tipo Promoción", renderCell: (rowData) => <>{rowData.tipoPromocion}</> },
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
            my: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Promociones
          </Typography>
          <Button
          sx={{
            bgcolor: '#fb6376',
            '&:hover': {
              bgcolor: '#f73754',
            },
          }}
            className="btn-primary"
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddPromocion}
          >
            Promocion
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box> 
        <TableComponent
          data={filterData}
          columns={columns}
          handleOpenEditModal={handleOpenEditModal}
          handleOpenDeleteModal={handleOpenDeleteModal} // Pasa la función para abrir la modal de eliminación
          isListaPedidos={false}
          
        />
        <ModalEliminarPromocion show={deleteModalOpen} onHide={handleCloseDeleteModal} promocion={promocionToEdit} onDelete={handleDelete} />
        {/* Llamando a ModalPromocion con la prop fetchPromocion y promocionToEdit */}
        <ModalPromocion getPromocion={fetchPromocion} promocionToEdit={promocionToEdit !== null ? promocionToEdit : undefined} />
      </Container>
    </Box>
  </React.Fragment>
  );
}