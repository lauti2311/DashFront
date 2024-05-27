import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SearchBar from '../common/SearchBar';

import CategoriaLista from '../Categoria/CategoriaLista';
import ICategoria from '../../types/Categoria';
import { setCategoria } from '../../redux/slices/categoria';
import CategoriaService from '../../services/CategoriaService';
import ModalCategoria from '../Modals/ModalCategoria';
import ModalEliminarCategoria from '../Modals/EliminarCategoria';

const Categoria = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const globalCategorias = useAppSelector((state) => state.categoria.categoria);
  const categoriaService = new CategoriaService();
  const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [filteredData, setFilteredData] = useState<ICategoria[]>([]);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteCategoria = (categoria: ICategoria) => {
    setSelectedCategoria(categoria);
    setOpen(false);
    setDeleteModal(true);
  };

  const handleEditCategoria = (categoria: ICategoria) => {
    setSelectedCategoria(categoria);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedCategoria && selectedCategoria.id) {
        await categoriaService.delete(url + 'categorias', selectedCategoria.id.toString());
        console.log('Se ha eliminado correctamente.');
        handleCloseModal(); // Cerramos el modal después de eliminar
        fetchCategorias(); // Refrescamos la lista después de eliminar
      } else {
        console.error('No se puede eliminar la categoria');
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const categorias = await categoriaService.getAll(url + 'categorias');
      dispatch(setCategoria(categorias));
      setFilteredData(categorias);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []); // Asegúrate de que el useEffect se ejecute solo una vez al montar el componente

  const handleSearch = (query: string) => {
    if (!globalCategorias) return;
    const filtered = globalCategorias.filter((item: ICategoria) =>
      item.denominacion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Categorías
          </Typography>
          <Button
            sx={{
              bgcolor: '#fb6376',
              '&:hover': {
                bgcolor: '#d73754',
              },
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Categoría
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        <CategoriaLista categorias={filteredData} onDelete={handleDeleteCategoria} onEdit={handleEditCategoria} />
        <ModalCategoria open={open} onClose={handleCloseModal} getCategories={fetchCategorias} categoryToEdit={selectedCategoria} />
        <ModalEliminarCategoria show={deleteModal}
          categoria={selectedCategoria}
          onDelete={() => {
            setDeleteModal(false);
            handleDelete();
          }}
          onClose={() => setDeleteModal(false)}
        />
      </Container>
    </Box>
  );
};

export default Categoria;
