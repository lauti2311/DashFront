import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Empresas } from './components/Empresa/Empresa';
import { ListaProductos } from './components/Producto/ListaProductos';
// import Perfil from './components/Perfil/Perfil';
import { ListaArticulosInsumo } from './components/Insumo/Insumo';
import Categoria from './components/Categoria/Categoria';
import Empleado from './components/Empleado/Empleado';
import Rol from './components/Rol/Rol';
import { ListaPromocion } from './components/Promocion/Promocion';
import Usuario from './components/Usuario/Usuario';
import { Sucursales } from './components/Sucursal/Sucursal';
import Inicio from './components/Inicio/Inicio';
import { Layout } from './components/common/GeneralLayout';
const App: React.FC = () => {
  return (
    <Router>
            <Routes>
              <Route element={<Layout/>}>
              <Route path="/productos/lista/:sucursalId" element={<ListaProductos />} />
              {/* <Route path="/perfil" element={<Perfil />} /> */}
              <Route path="/inicio/:sucursalId" element={<Inicio />} /> 
              <Route path='/articuloInsumo/lista/:sucursalId' element={<ListaArticulosInsumo />} />
              <Route path="/categorias/:sucursalId" element={<Categoria />} />
              <Route path="/empleados" element={<Empleado />} />
              <Route path="/roles" element={<Rol />} />
              <Route path="/usuario" element={<Usuario />} />
              <Route path="/promociones/lista/:sucursalId" element={<ListaPromocion />} />
              </Route>
              
              <Route path="/" element={ <Empresas />} />
              <Route path="/sucursales/:empresaId" element={<Sucursales/>} />  
            </Routes>
    </Router>
  );
}

export default App;
