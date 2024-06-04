import React from 'react';
import './EmpresaCard.css'; // Estilo opcional
import IEmpresa from '../../types/Empresa';
// import { Menu } from '@mui/material';
import './EmpresaCard.css';

interface EmpresaCardProps {
  empresa: IEmpresa;
}

const EmpresaCard: React.FC<EmpresaCardProps> = ({ empresa }) => {
  return (
    <div className="empresa-card">
      <img src={empresa.imagen.url} alt={empresa.nombre} />
      <h2>{empresa.nombre}</h2>
      <p>{empresa.razonSocial}</p>
    </div>
  );
};

export default EmpresaCard;
