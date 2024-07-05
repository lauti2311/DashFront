import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Empresas } from './components/Empresa/Empresa';
import Producto from './components/Producto/Producto';
// import Perfil from './components/Perfil/Perfil';
import Insumo from './components/Insumo/Insumo';
import Categoria from './components/Categoria/Categoria';
import Empleado from './components/Empleado/Empleado';
import Rol from './components/Rol/Rol';
//import Promocion from './components/Promocion/Promocion';
import Usuario from './components/Usuario/Usuario';
import { Sucursales } from './components/Sucursal/Sucursal';
import Inicio from './components/Inicio/Inicio';
import { Layout } from './components/common/GeneralLayout';

const App: React.FC = () => {
  return (
    <Router>
            <Routes>
              <Route element={<Layout/>}>
              <Route path="/productos/lista/:sucursalId" element={<Producto />} />
              {/* <Route path="/perfil" element={<Perfil />} /> */}
              <Route path="/inicio/:sucursalId" element={<Inicio />} /> ta
              <Route path='/articuloInsumo/lista/:sucursalId' element={<Insumo />} />
              <Route path="/categorias/:sucursalId" element={<Categoria />} />
              <Route path="/empleados" element={<Empleado />} />
              <Route path="/roles" element={<Rol />} />
              <Route path="/usuario" element={<Usuario />} />
              </Route>
              {/* Route path="/promociones" element={<Promocion />} /> */}
              <Route path="/" element={ <Empresas />} />
              <Route path="/sucursales/:empresaId" element={<Sucursales/>} />  
              {/* Otras rutas */}
            </Routes>
    </Router>
  );
}

export default App;
