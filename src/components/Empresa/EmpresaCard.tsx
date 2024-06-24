import React, { useCallback, useEffect, useState } from 'react';
import '../../components/ui/Empresa/EmpresaCard.css';
import EmpresaService from '../../services/EmpresaService';
import Empresa from '../../types/Empresa';
import { useAppDispatch } from '../../hooks/redux';
import { setEmpresa } from '../../redux/slices/Empresa';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import AgregarEmpresa from './AgregarEmpresa';
import ModalEmpresa from '../Modals/Empresa/ModalEmpresa'; // Importa el componente ModalEmpresa
import { useNavigate } from 'react-router-dom';

interface Row {
  [key: string]: unknown;
}

const EmpresaCard: React.FC = () => {
  const empresaService = new EmpresaService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [clickedEmpresaId, setClickedEmpresaId] = useState<null | number>(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const [empresaToEdit, setEmpresaToEdit] = useState<null | Empresa>(null); // Estado para la empresa a editar
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = (empresa: Empresa) => {
    setEmpresaToEdit(empresa);
    setModalOpen(true);
  };

  const handleDelete = async (empresa: Empresa) => {
    try {
      const updatedEmpresa = { ...empresa, eliminado: true };
      await empresaService.put(url + "empresas", empresa.id.toString(), updatedEmpresa);
      // Actualizar el estado local después de eliminar
      const updatedData = filterData.map(item =>
        item.id === empresa.id ? { ...item, eliminado: true } : item
      );
      setFilterData(updatedData);
      // Mostrar una alerta u otra acción de confirmación
      alert(`Empresa eliminada ID: ${empresa.id}`);
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
      // Manejo de errores: mostrar un mensaje de error al usuario, etc.
    }
  };

  const handleDetail = (empresa: Empresa) => {
    alert(`Detalles empresa ID: ${empresa.id}`);
  };

  const fetchImages = useCallback(
    async (empresaId: string) => {
      try {
        const response = await empresaService.get(
          `${url}empresas/getAllImagesByEmpresaId`,
          empresaId
        );

        if (Array.isArray(response) && response.length > 0) {
          return response[0].url;
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    [empresaService, url]
  );

  const fetchEmpresa = useCallback(async () => {
    try {
      const empresas = await empresaService.getAll(url + "empresas");
      const empresasConImagenes = await Promise.all(
        empresas.map(async (empresa) => {
          const imagenUrl = await fetchImages(empresa.id.toString());
          return { ...empresa, imagen: imagenUrl };
        })
      );
      dispatch(setEmpresa(empresasConImagenes));
      setFilterData(empresasConImagenes);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  }, [dispatch, empresaService, url, fetchImages]);

  useEffect(() => {
    fetchEmpresa();
  }, [fetchEmpresa]);

  const handleClick = (empresa: Empresa) => {
    navigate(`/sucursales/${empresa.id}`);
  }; 

  const handleAddEmpresa = () => {
    setEmpresaToEdit(null); // Resetea la empresa a editar
    setModalOpen(true); // Cambia el estado para abrir el modal
  };

  return (
    <div className="empresa-list">
      <AgregarEmpresa onClick={() => handleAddEmpresa()} />
      <ModalEmpresa open={modalOpen} onClose={() => setModalOpen(false)} getEmpresas={fetchEmpresa} empresaToEdit={empresaToEdit} />
      {filterData.map((empresa) => (
        <div
          key={empresa.id}
          className={`empresa-card ${empresa.id === clickedEmpresaId ? 'clicked' : ''}`}
          onClick={() => handleClick(empresa)}
        >
          {empresa.imagen ? (
            <img src={empresa.imagen} alt={empresa.nombre} />
          ) : (
            <div className="placeholder-img">No image</div>
          )}
          <div className="empresa-info">
            <h2>{empresa.nombre}</h2>
            <p>{empresa.razonSocial}</p>
            <div className="button-container">
              <IconButton className="edit-icon" onClick={(e) => { e.stopPropagation(); handleEdit(empresa); }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton className="list-icon" onClick={(e) => { e.stopPropagation(); handleDetail(empresa); }}>
                <ListIcon fontSize="small" />
              </IconButton>
              <IconButton className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(empresa); }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpresaCard;
