import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { useParams } from 'react-router-dom';
import ISucursal from '../../types/Sucursal';
import SucursalService from '../../services/SucursalService';
import SucursalCard from './SucursalCard';

const Sucursal: React.FC = () => {
  const { empresaId } = useParams<{ empresaId: string }>();
  const [sucursales, setSucursales] = useState<ISucursal[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAllSucursales = async () => {
    try {
      const sucursalService = new SucursalService();
      const data = await sucursalService.getAll(`http://localhost:8080/sucursales/empresa/${empresaId}`);
      setSucursales(data);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (empresaId) {
      handleGetAllSucursales();
    }
  }, [empresaId]);

  return (
    <Box component="main" className="main">
      <div className='title'>
        Sucursales
      </div>
      <Box className="container">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          sucursales.map(sucursal => (
            <SucursalCard key={sucursal.id} sucursal={sucursal} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Sucursal;
