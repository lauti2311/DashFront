import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AgregarEmpresaProps {
  onClick: () => void;
}

const AgregarEmpresa: React.FC<AgregarEmpresaProps> = ({ onClick }) => {
  return (
    <div className="empresa-card add-card" onClick={onClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <IconButton className="add-icon">
        <AddIcon sx={{ fontSize: '100px'}} />
      </IconButton>
    </div>
  );
};

export default AgregarEmpresa;
