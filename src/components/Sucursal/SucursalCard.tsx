import React from 'react';
import '../../components/ui/Sucursal/SucursalCard.css';
import ISucursal from '../../types/Sucursal';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';

interface SucursalCardProps {
  sucursal: ISucursal;
}

const SucursalCard: React.FC<SucursalCardProps> = ({ sucursal }) => {
  const handleEdit = () => {
    alert(`Editamos la sucursal ID: ${sucursal.id}`);
  };

  const handleDelete = () => {
    alert(`Eliminamos la sucursal ID: ${sucursal.id}`);
  };

  const handleDetail = () => {
    alert(`Detalles sucursal ID: ${sucursal.id}`);
  };

  return (
    <div className="sucursal-card">
      {sucursal.imagenes.url ? (
        <img src={sucursal.imagenes.url} alt={sucursal.nombre} />
      ) : (
        <div className="placeholder-img">No image</div>
      )}
      <div className="sucursal-info">
        <h2>{sucursal.nombre}</h2>
        <p>{sucursal.empresa.razonSocial}</p>
        <div className="button-container">
          <IconButton className="edit-icon" onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton className="list-icon" onClick={(e) => { e.stopPropagation(); handleDetail(); }}>
            <ListIcon fontSize="small" />
          </IconButton>
          <IconButton className="delete-icon" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default SucursalCard;
