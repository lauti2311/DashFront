/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { setArticuloManufacturado } from "../../redux/slices/articuloManufacturado.ts";
import { toggleModal } from "../../redux/slices/Modal.ts";
import ArticuloManufacturadoService from "../../services/ArticuloManufacturadoService.ts";
import AManufacturado from "../../types/ArticuloManufacturado.ts";
import TableComponent from "../Table/Table.tsx";
import ModalProducto from "../Modals/ModalProducto/ModalProducto.tsx";
import ModalEliminarProducto from "../Modals/ModalProducto/ModalEliminarProducto.tsx";
import UnidadMedida from "../../types/UnidadMedida.ts";
import { handleSearch } from "../../utils/utils.ts";
import SearchBar from "../common/SearchBar.tsx";
import { useParams } from "react-router-dom";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

export const ListaProductos = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  const productoService = new ArticuloManufacturadoService();
  const [filteredData, setFilterData] = useState<Row[]>([]);
  const [productToEdit, setProductToEdit] = useState<AManufacturado | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const {sucursalId} = useParams();

  const globalArticuloManufacturado = useAppSelector(
      (state) => state.articuloManufacturado.data
  );
  

  const fetchImages = useCallback(async (productoId: string) => {
    try {
      const response = await productoService.get(
        url + 'articuloManufacturado/getAllImagesByArticuloManufacturadoId',
        productoId,
      );
      console.log(response);
      if (Array.isArray(response) && response.length > 0) {
        return response[0].url;
      }
      return 'https://via.placeholder.com/150';
    } catch (error) {
      console.error('Error fetching images:', error);
      return 'https://via.placeholder.com/150';
    }
  }, [productoService, url]);
  
  const fetchProductos = useCallback(async () => {
    try {
      // Asegúrate de que sucursalId esté definido y conviértelo a un número si es necesario
      if (sucursalId) {
        const sucursalIdNumber = parseInt(sucursalId, 10); // Convertir sucursalId a número si es una cadena
        const productos = (await productoService.manufacturados(url, sucursalIdNumber));
        console.log(productos);
        dispatch(setArticuloManufacturado(productos));
        setFilterData(productos);
      }
    } catch (error) {
      console.error('Error fetching productos:', error);
    }
  }, [productoService, url, fetchImages, sucursalId, dispatch, setFilterData]);
  
  
  useEffect(() => {
    fetchProductos();
    onSearch("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleOpenDeleteModal = (rowData: Row) => {
    setProductToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      denominacion: rowData.denominacion,
      precioVenta: rowData.precioVenta,
      imagenes: rowData.imagenes,
      unidadMedida: rowData.unidadMedida,
      descripcion: rowData.descripcion,
      tiempoEstimadoMinutos: rowData.tiempoEstimadoMinutos,
      preparacion: rowData.preparacion,
      articuloManufacturadoDetalles: rowData.articuloManufacturado,
      categoria: rowData.categoria,
      sucursal: rowData.sucursal
    });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {

    console.log(deleteModalOpen)

    setDeleteModalOpen(false); // Utiliza el estado directamente para cerrar la modal de eliminación
    fetchProductos();
  };

  const handleDelete = async () => {
    try {
      if (productToEdit && productToEdit.id) {
        await productoService.delete(url + 'articuloManufacturado', productToEdit.id.toString()); // Eliminar el producto
        console.log('Se ha eliminado correctamente.');
        handleCloseDeleteModal(); // Cerrar el modal de eliminación
        fetchProductos();
      } else {
        console.error('No se puede eliminar el producto porque no se proporcionó un ID válido.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  const handleAddProduct = () => {
    setProductToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenEditModal = (rowData: Row) => {
    setProductToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      denominacion: rowData.denominacion,
      precioVenta: rowData.precioVenta,
      imagenes: rowData.imagenes,
      unidadMedida: rowData.unidadMedida,
      descripcion: rowData.descripcion,
      tiempoEstimadoMinutos: rowData.tiempoEstimadoMinutos,
      preparacion: rowData.preparacion,
      articuloManufacturadoDetalles: rowData.articuloManufacturadoDetalles,
      categoria: rowData.categoria,
      sucursal: rowData.sucursal
    });
    dispatch(toggleModal({ modalName: 'modal' }));
  };


  // Función para manejar la búsqueda de artículos manufacturados
  const onSearch = (query: string) => {
    handleSearch(query, globalArticuloManufacturado, setFilterData);
  };

  // Definición de las columnas para la tabla de artículos manufacturados
  const columns: Column[] = [
    // { id: "id", label: "Id", renderCell: (rowData) => <>{rowData.id}</> },
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    { id: "categoria", label: "Categoria", renderCell: (rowData) => <>{rowData.categoria.denominacion}</> },
    { id: "precioVenta", label: "Precio", renderCell: (rowData) => <>{rowData.precioVenta}</> },
    { id: "descripcion", label: "Descripción", renderCell: (rowData) => <>{rowData.descripcion}</> },
    {
      id: "tiempoEstimadoMinutos",
      label: "Tiempo estimado en minutos",
      renderCell: (rowData) => <>{rowData.tiempoEstimadoMinutos}</>,
    }, 
    {
      id: "unidadMedida",
      label: "Unidad Medida",
      renderCell: (rowData) => {
        // Verifica si la unidad de medida está presente y si tiene la propiedad denominacion
        const unidadMedida: UnidadMedida = rowData.unidadMedida;
        if (unidadMedida && unidadMedida.denominacion) {
          return <span>{unidadMedida.denominacion}</span>;
        } else {
          // Si la unidad de medida no está presente o no tiene denominacion, muestra un valor por defecto
          return <span>Sin unidad de medida</span>;
        }
      }
    },

  ];

  return (
  <React.Fragment>
    <Box
        component="main"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1,  }}
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
              Productos
            </Typography>
            <Button
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1, bgcolor: '#fb6376',
                '&:hover': {
                  bgcolor: '#f73754',
                }, }}
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddProduct}
            >
              Producto
            </Button>
          </Box>
          {/* Barra de búsqueda */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
          {/* Componente de tabla para mostrar los artículos manufacturados */}
          <TableComponent data={filteredData} columns={columns} handleOpenDeleteModal={handleOpenDeleteModal} handleOpenEditModal={handleOpenEditModal} isListaPedidos={false} />

          {/* Llamando a ModalCupon con la prop fetchCupones y cuponToEdit */}
          <ModalProducto getProducts={fetchProductos} productToEdit={productToEdit !== null ? productToEdit : undefined} />

          <ModalEliminarProducto show={deleteModalOpen} onHide={handleCloseDeleteModal} product={productToEdit} onDelete={handleDelete} />
        </Container>
      </Box>
      </React.Fragment>

  );
}
