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
import ModalEmpresa from '../Modals/ModalEmpresa'; // Importa el componente ModalEmpresa

interface Row {
  [key: string]: unknown;
}

const EmpresaCard: React.FC = () => {
  const empresaService = new EmpresaService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [clickedEmpresaId] = useState<null | number>(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();

  const handleEdit = (empresa: Empresa) => {
    alert(`Empresa ID: ${empresa.id}`);
  };

  const handleDelete = (empresa: Empresa) => {
    alert(`Eliminamos la empresa ID: ${empresa.id}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (empresa: Empresa) => {
    alert(`Nombre: ${empresa.nombre}\nRazón Social: ${empresa.razonSocial}\nID: ${empresa.id}\nImagen: ${empresa.imagen}\nEliminado: ${empresa.eliminado}\nCUIL: ${empresa.cuil}`);
  };

  const handleAddEmpresa = () => {
    setModalOpen(true); // Cambia el estado para abrir el modal
  };

  return (
    <div className="empresa-list">
      <AgregarEmpresa onClick={() => handleAddEmpresa()} />
      {/* Integra el modal y pasa el estado y la función para cerrarlo */}
      <ModalEmpresa open={modalOpen} onClose={() => setModalOpen(false)} getEmpresas={fetchEmpresa} />
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
