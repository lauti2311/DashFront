import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicSidebar from './components/common/BasicSidebar';
import { Empresas } from './components/Empresa/Empresa';
import Inicio from './components/Inicio/Inicio';
import Producto from './components/Producto/Producto';
import Perfil from './components/Perfil/Perfil';
import Insumo from './components/Insumo/Insumo';
import Categoria from './components/Categoria/Categoria';
import Empleado from './components/Empleado/Empleado';
import Rol from './components/Rol/Rol';
import BaseNavbar from './components/common/BaseNavbar';
//import Promocion from './components/Promocion/Promocion';
import Usuario from './components/Usuario/Usuario';
import { Sucursales } from './components/Sucursal/Sucursal';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ width: '100%' }}>
        <BaseNavbar />
      </div>
      <div className='d-flex'>
      <BasicSidebar />

            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/productos" element={<Producto />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/insumos" element={<Insumo />} />
              <Route path="/categorias" element={<Categoria />} />
              <Route path="/empleados" element={<Empleado />} />
              <Route path="/roles" element={<Rol />} />
              <Route path="/usuario" element={<Usuario />} />
              {/* Route path="/promociones" element={<Promocion />} /> */}
              <Route path="/sucursales/:empresaId" element={<Sucursales />} /> 
              {/* Otras rutas */}
            </Routes>
            </div>
    </Router>
  );
}

export default App;
