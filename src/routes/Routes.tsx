import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/common/GeneralLayout';
import { Empresas } from '../components/Empresa/Empresa';
import Inicio from '../components/Inicio/Inicio';
import { ListaArticulosInsumo } from '../components/Insumo/Insumo';
import { ListaProductos } from '../components/Producto/ListaProductos';
import { ListaPromocion } from '../components/Promocion/Promocion';
import Rol from '../components/Rol/Rol';
import { Sucursales } from '../components/Sucursal/Sucursal';
import Usuario from '../components/Usuario/Usuario';
import Categoria from '../components/Categoria/Categoria';
import { AuthenticationGuard } from '../auth/AuthenticationGuard';

const App: React.FC = () => {
  return (
      <Routes>
      <Route element={<Layout />}>
        <Route path="/productos/lista/:sucursalId" element={<AuthenticationGuard component={ListaProductos} />} />
        {/* <Route path="/perfil" element={<Perfil />} /> */}
        <Route path="/inicio/:sucursalId" element={<AuthenticationGuard component={Inicio} />} />
        <Route path='/articuloInsumo/lista/:sucursalId' element={<AuthenticationGuard component={ListaArticulosInsumo} />} />
        <Route path="/categorias/:sucursalId" element={<AuthenticationGuard component={Categoria} />} />
        <Route path="/roles" element={<AuthenticationGuard component={Rol} />} />
        <Route path="/usuario" element={<AuthenticationGuard component={Usuario} />} />
        <Route path="/promociones/lista/:sucursalId" element={<AuthenticationGuard component={ListaPromocion} />} />
      </Route>
      <Route path="/" element={<AuthenticationGuard component={Empresas} />} />
      <Route path="/sucursales/:empresaId" element={<AuthenticationGuard component={Sucursales} />} />
    </Routes>

  );
}

export default App;
