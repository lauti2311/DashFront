import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Empresas } from './components/Empresa/Empresa';
import Producto from './components/Producto/Producto';
// import Perfil from './components/Perfil/Perfil';
import Insumo from './components/Insumo/Insumo';
import Categoria from './components/Categoria/Categoria';
import Empleado from './components/Empleado/Empleado';
import Rol from './components/Rol/Rol';
import { BaseNavBar } from './components/common/BaseNavbar';
//import Promocion from './components/Promocion/Promocion';
import Usuario from './components/Usuario/Usuario';
import { Sucursales } from './components/Sucursal/Sucursal';
import Inicio from './components/Inicio/Inicio';

const App: React.FC = () => {
  return (
    <Router>
            <Routes>
              <Route path="/" element={<><BaseNavBar title="Empresas" /> <Empresas /></>} />
              <Route path="/productos/lista/:sucursalId" element={<Producto />} />
              {/* <Route path="/perfil" element={<Perfil />} /> */}
              <Route path="/inicio/:sucursalId" element={<Inicio />} /> ta
              <Route path='/articuloInsumo/lista/:sucursalId' element={<Insumo />} />
              <Route path="/categorias/:sucursalId" element={<Categoria />} />
              <Route path="/empleados" element={<Empleado />} />
              <Route path="/roles" element={<Rol />} />
              <Route path="/usuario" element={<Usuario />} />
              {/* Route path="/promociones" element={<Promocion />} /> */}
              <Route path="/sucursales/:empresaId" element={<><BaseNavBar title="Sucursales" /><Sucursales /></>} />  
              {/* Otras rutas */}
            </Routes>
    </Router>
  );
}

export default App;
