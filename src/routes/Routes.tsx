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
import { ListaUnidadMedida } from '../components/UnidadMedida/ListaUnidadMedida';
import { ListaPedidos } from '../components/Pedidos/PedidosLista';
import { Reportes } from '../components/Reportes/Reportes';

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/productos/lista/:sucursalId" element={<ListaProductos />} />
        <Route path="/pedidos/:sucursalId" element={<ListaPedidos />}/>
        <Route path="/inicio/:sucursalId" element={<Inicio />} />
        <Route path='/articuloInsumo/lista/:sucursalId' element={<ListaArticulosInsumo />} />
        <Route path="/categorias/:sucursalId" element={<Categoria />} />
        <Route path="/roles" element={<Rol />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/promociones/lista/:sucursalId" element={<ListaPromocion />} />
        <Route path='/unidadMedida/:sucursalId' element={<ListaUnidadMedida />}/>
        <Route path="/reportes/:sucursalId" element={<Reportes />}/>
      </Route>
      <Route path="/" element={<Empresas />} />
      <Route path="/sucursales/:empresaId" element={<Sucursales />} />
    </Routes>

  );
}

export default App;
