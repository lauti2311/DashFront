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
import { ListaUnidadMedida } from '../components/UnidadMedida/ListaUnidadMedida';
import { ListaPedidos } from '../components/Pedidos/PedidosLista';
import { Reportes } from '../components/Reportes/Reportes';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/productos/lista/:sucursalId" element={<AuthenticationGuard component={ListaProductos} />} />
        <Route path="/pedidos/:sucursalId" element={<AuthenticationGuard component={ListaPedidos} />}/>
        <Route path="/inicio/:sucursalId" element={<AuthenticationGuard component={Inicio} />} />
        <Route path='/articuloInsumo/lista/:sucursalId' element={<AuthenticationGuard component={ListaArticulosInsumo} />} />
        <Route path="/categorias/:sucursalId" element={<AuthenticationGuard component={Categoria} />} />
        <Route path="/roles" element={<AuthenticationGuard component={Rol} />} />
        <Route path="/usuarios" element={<AuthenticationGuard component={Usuario} />} />
        <Route path="/promociones/lista/:sucursalId" element={<AuthenticationGuard component={ListaPromocion} />} />
        <Route path='/unidadMedida/:sucursalId' element={<AuthenticationGuard component={ListaUnidadMedida}/>}/>
        <Route path="/reportes/:sucursalId" element={<AuthenticationGuard component={Reportes} />}/>
      </Route>
      <Route path="/" element={<AuthenticationGuard component={Empresas} />} />
      <Route path="/sucursales/:empresaId" element={<AuthenticationGuard component={Sucursales} />} />
    </Routes>

  );
}

export default App;
