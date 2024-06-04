import React, { useState } from 'react';
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import IEmpresa from '../../types/Empresa';
import EmpresaService from '../../services/EmpresaService';

const Empresa = () => {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGetAllEmpresas = async () => {
    try {
      const empresaService = new EmpresaService();
      const data = await empresaService.getAll('http://localhost:8080/empresas'); // Cambia esta URL por la de tu API real
      setEmpresas(data);
      setError(null);
      
      // Crear el mensaje para el alert
      const empresaNombres = data.map(empresa => `${empresa.nombre} - ${empresa.razon_social}`).join('\n');
      alert(`Empresas obtenidas:\n${empresaNombres}`);

    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Button variant="contained" color="primary" onClick={handleGetAllEmpresas}>
        Obtener Empresas
      </Button>
      {error && <Typography color="error">Error: {error}</Typography>}
      <List>
        {empresas.map((empresa, index) => (
          <ListItem key={index}>
            {empresa.nombre} - {empresa.razon_social}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Empresa;
