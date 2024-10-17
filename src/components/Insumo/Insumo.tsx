/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, Container, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import ArticuloInsumoService from "../../services/ArticuloInsumoService.ts";
import { toggleModal } from "../../redux/slices/Modal";
import SearchBar from "../../components/common/SearchBar";
import TableComponent from "../../components/Table/Table.tsx";
import ModalEliminarArticuloInsumo from "../Modals/ModalInsumos/ModalEliminarArticuloInsumo.tsx";
import ModalArticuloInsumo from "../Modals/ModalInsumos/ModalArticuloInsumo.tsx";
import ArticuloInsumo from "../../types/ArticuloInsumo";
import { handleSearch } from "../../utils/utils";
import { setArticuloInsumo } from "../../redux/slices/articuloInsumo";
import UnidadMedida from "../../types/UnidadMedida";
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';


interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

export const ListaArticulosInsumo = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const articuloInsumoService = new ArticuloInsumoService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [articuloToEdit, setArticuloToEdit] = useState<ArticuloInsumo | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const globalArticuloInsumo = useAppSelector(
    (state) => state.articuloInsumo.data
  );
  const { sucursalId } = useParams();
  const fetchArticulosInsumo = useCallback(async () => {
    try {
      if (sucursalId) {
        const sucursalIdNumber = parseInt(sucursalId);
        const articulosInsumo = await articuloInsumoService.insumos(
          url,
          sucursalIdNumber,
        );

        dispatch(setArticuloInsumo(articulosInsumo));
        setFilterData(articulosInsumo);
      }
    } catch (error) {
      console.error("Error al obtener los artículos de insumo:", error);
    }
  }, [dispatch, articuloInsumoService, url, sucursalId]);

  useEffect(() => {
    fetchArticulosInsumo();
    onSearch('');
  }, []);

  const handleOpenDeleteModal = (rowData: Row) => {
    setArticuloToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      denominacion: rowData.denominacion,
      precioVenta: rowData.precioVenta,
      imagenes: rowData.imagenes,
      precioCompra: rowData.precioCompra,
      stockActual: rowData.stockActual,
      stockMaximo: rowData.stockMaximo,
      stockMinimo: rowData.stockMinimo,
      esParaElaborar: rowData.esParaElaborar,
      unidadMedida: rowData.unidadMedida,
      categoria: rowData.categoria,
      sucursal: rowData.sucursal,
    });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };
  const onDeleteArticuloInsumo = (id: number) => {
    setFilterData(prevFilterData => prevFilterData.filter(item => item.id !== id));
  };

  const handleAddArticuloInsumo = () => {
    setArticuloToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenEditModal = (rowData: Row) => {
    setArticuloToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      denominacion: rowData.denominacion,
      precioVenta: rowData.precioVenta,
      imagenes: rowData.imagenes,
      precioCompra: rowData.precioCompra,
      stockActual: rowData.stockActual,
      stockMaximo: rowData.stockMaximo,
      stockMinimo: rowData.stockMinimo,
      esParaElaborar: rowData.esParaElaborar,
      unidadMedida: rowData.unidadMedida,
      categoria: rowData.categoria,
      sucursal: rowData.sucursal,
    });
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const onSearch = (query: string) => {
    if (globalArticuloInsumo) {
      handleSearch(query, globalArticuloInsumo, setFilterData);
    }
  };

  const columns: Column[] = [
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    { id: "categoria", label: "Categoría", renderCell: (rowData) => <>{rowData.categoria.denominacion}</> },
    { id: "precioVenta", label: "Precio Venta", renderCell: (rowData) => <>{rowData.precioVenta}</> },
    { id: "precioCompra", label: "Precio Compra", renderCell: (rowData) => <>{rowData.precioCompra}</> },
    { id: "stockActual", label: "Stock Actual", renderCell: (rowData) => <>{rowData.stockActual}</> },
    { id: "stockMaximo", label: "Stock Maximo", renderCell: (rowData) => <>{rowData.stockMaximo}</> },
    { id: "stockMinimo", label: "Stock Minimo", renderCell: (rowData) => <>{rowData.stockMinimo}</> },
    { id: "esParaElaborar", label: "Es para elaborar", renderCell: (rowData) => <span>{rowData.esParaElaborar ? "Sí" : "No"}</span> },
    {
      id: "unidadMedida",
      label: "Unidad Medida",
      renderCell: (rowData) => {
        const unidadMedida: UnidadMedida = rowData.unidadMedida;
        if (unidadMedida && unidadMedida.denominacion) {
          return <span>{unidadMedida.denominacion}</span>;
        } else {
          return <span>Sin unidad de medida</span>;
        }
      },
    },
    { id: "acciones", label: "Acciones", renderCell: (rowData) => (
      <>
         <IconButton aria-label="editar" onClick={() => handleOpenEditModal(rowData)}>        
         <EditIcon /> 
              </IconButton>
              <IconButton aria-label="eliminar" onClick={() => handleOpenDeleteModal(rowData)}>      
              <DeleteIcon />         
              </IconButton>
      </>
    ) }
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>      
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Artículos de Insumo
          </Typography>
          <Button
            sx={{
              bgcolor: '#fb6376',
              '&:hover': {
                bgcolor: '#f73754',
              },
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddArticuloInsumo}
          >
            Nuevo Artículo
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <TableComponent
          data={filterData}
          columns={columns}
          handleOpenEditModal={handleOpenEditModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
          isListaPedidos={false}
        />
        <ModalEliminarArticuloInsumo
          show={deleteModalOpen}
          onHide={handleCloseDeleteModal}
          articuloInsumo={articuloToEdit}
          onDeleteArticuloInsumo={onDeleteArticuloInsumo} // Pasamos la función de eliminación
        />
        <ModalArticuloInsumo
          getArticulosInsumo={fetchArticulosInsumo}
          articuloToEdit={articuloToEdit !== null ? articuloToEdit : undefined}
        />
      </Container>
    </Box>
  );
};
