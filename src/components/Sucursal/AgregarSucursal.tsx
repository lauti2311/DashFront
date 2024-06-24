import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AgregarSucursalProps {
  onClick: () => void;
}

const AgregarSucursal: React.FC<AgregarSucursalProps> = ({ onClick }) => {
  return (
    <div className="sucursal-card add-card" onClick={onClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton className="add-icon">
        <AddIcon sx={{ fontSize: '100px'}} />
      </IconButton>
    </div>
  );
};

export default AgregarSucursal;
