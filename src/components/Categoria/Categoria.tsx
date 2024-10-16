/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchBar from "../../components/common/SearchBar.tsx";
import CategoriaService from "../../services/CategoriaService";
import CategoriaLista from "./CategoriaLista";
import ModalCategoria from "../../components/Modals/ModalCategoria/ModalCategoria"
import ModalEliminarCategoria from "../../components/Modals/ModalCategoria/EliminarCategoria.tsx";
import ICategoria from "../../types/Categoria";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCategoria } from "../../redux/slices/categoria.ts";
import { handleSearch } from "../../utils/utils.ts";
import { useParams } from "react-router-dom";

const Categoria = () => {

  const url = import.meta.env.VITE_API_URL;
  const categoriaService = new CategoriaService();
  const dispatch = useAppDispatch();
  const [filteredData, setFilterData] = useState<ICategoria[]>([]);
  const globalCategorias = useAppSelector((state) => state.categoria.categoria);
  const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(
    null
  );
  const { sucursalId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [eliminarModalOpen, setEliminarModalOpen] = useState(false);

  const fetchCategorias = useCallback(async () => {
    try {
      if(sucursalId){
        const parsedSucursalId = parseInt(sucursalId, 10); 

        const categorias = await categoriaService.categoriaSucursal(url, parsedSucursalId, );
  
        // Filtrar las subcategorías para obtener sus IDs
        const subCategoriaIds = categorias.filter(categoria => categoria.subCategorias.length > 0)
          .map(subcategoria => subcategoria.subCategorias.map(sub => sub.id))
          .flat();
                                          
        // Filtrar las categorías principales excluyendo aquellas que son subcategorías
        const categoriasPrincipales = categorias.filter(categoria => !subCategoriaIds.includes(categoria.id));
  
        dispatch(setCategoria(categoriasPrincipales));
        setFilterData(categoriasPrincipales)
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  }, [dispatch, categoriaService, url, sucursalId]);
  
  useEffect(() => {
    fetchCategorias();
    onSearch(""); // Llamada a onSearch para filtrar los datos iniciales
  }, []);

  const handleEditarCategoria = (categoria: ICategoria) => {
    setSelectedCategoria(categoria);
    setModalOpen(true);
  };

  const handleAgregarCategoria = () => {
    setSelectedCategoria(null);
    setModalOpen(true);
  };
  const handleAgregarSubCategoria = () => {
    setSelectedCategoria(null);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEliminarCategoria = (categoria: ICategoria) => {
    setSelectedCategoria(categoria);
    setModalOpen(false);
    setEliminarModalOpen(true);
  };

  const handleEliminar = async () => {
    try {
      if (selectedCategoria && selectedCategoria.id) {
        await categoriaService.delete(
          url + "categoria",
          selectedCategoria.id.toString()
        );
        console.log("Se ha eliminado correctamente.");
        handleCloseModal(); // Cerramos el modal después de eliminar
      } else {
        console.error(
          "No se puede eliminar la categoría porque no se proporcionó un ID válido."
        );
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const onSearch = (query: string) => {
    handleSearch(query, globalCategorias, setFilterData);
  };

  return (
    <React.Fragment>
      <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Categorías
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
              onClick={handleAgregarCategoria}
            >
              Categoría
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
          <CategoriaLista
            categorias={filteredData}
            onEditar={handleEditarCategoria}
            onDelete={handleEliminarCategoria}
            onAddSubCategoria={handleAgregarSubCategoria}
            getCategories={() => fetchCategorias()}
          />
          <ModalCategoria
            open={modalOpen}
            onClose={handleCloseModal}
            getCategories={() => fetchCategorias()}
            categoryToEdit={selectedCategoria}
          />
          <ModalEliminarCategoria
            show={eliminarModalOpen}
            categoria={selectedCategoria}
            onDelete={handleEliminar} 
            getCategories={() => fetchCategorias()}
            onClose={() => setEliminarModalOpen(false)}
          />
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Categoria;
