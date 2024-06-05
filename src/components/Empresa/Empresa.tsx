import { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import IEmpresa from '../../types/Empresa';
import EmpresaService from '../../services/EmpresaService';
import EmpresaCard from '../Empresa/EmpresaCard';
import '../../components/ui/Empresa/Empresa.css'; // Import the CSS file

const Empresa = () => {
  const [,setEmpresas] = useState<IEmpresa[]>([]);
  const [,setError] = useState<string | null>(null);

  const handleGetAllEmpresas = async () => {
    try {
      const empresaService = new EmpresaService();
      const data = await empresaService.getAll('http://localhost:8080/empresas');
      setEmpresas(data);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    handleGetAllEmpresas();
  }, []);

  return (
    <Box component="main" className="main">
      <div className='title'>
        Empresas
      </div>
      <Box 
        className="container"
      >
        <EmpresaCard/>
      </Box>
    </Box>
  );
  
};

export default Empresa;
