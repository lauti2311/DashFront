import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { cilBarChart, cilBlur, cilCart, cilFastfood, cilUser, cilDollar, cilApps, cilChart, cilMediaStop } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { useAuth } from '../Login/AuthContext';

const SideBar: React.FC = () => {
  const { sucursalId } = useParams();
  const { role } = useAuth();

  return (
    <div>
      <CSidebar className="border-end d-flex flex-column" style={{ height: '100vh' }}>
        <CSidebarNav>
          <CNavTitle>Dashboard</CNavTitle>
          
          {(role === 'ADMIN' || role === 'EMPLEADO') && (
            <CNavItem>
              <Link to={`/inicio/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilBarChart} />
                Inicio
              </Link>
            </CNavItem>
          )}

          {(role === 'ADMIN' || role === 'COCINERO' || role === 'EMPLEADO') && (
            <CNavItem>
              <Link to={`/productos/lista/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilFastfood} />
                Productos
              </Link>
            </CNavItem>
          )}

          {(role === 'ADMIN' || role === 'COCINERO') && (
            <>
              <CNavItem>
                <Link to={`/categorias/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilBlur} />
                  Categorías
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to={`/unidadMedida/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilMediaStop} />
                  Unidades de Medida
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to={`/articuloInsumo/lista/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilCart} />
                  Insumos
                </Link>
              </CNavItem>
            </>
          )}

          {role === 'ADMIN' && (
            <>
              <CNavItem>
                <Link to={`/promociones/lista/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilDollar} />
                  Promociones
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to={`/usuarios/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilUser} />
                  Usuarios
                </Link>
              </CNavItem>
            </>
          )}

          {(role === 'ADMIN' || role === 'CAJERO') && (
            <>
              <CNavItem>
                <Link to={`/pedidos/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilApps} />
                  Pedidos
                </Link>
              </CNavItem>
              <CNavItem>
                <Link to={`/reportes/${sucursalId}`} className="nav-link">
                  <CIcon customClassName="nav-icon" icon={cilChart} />
                  Reportes
                </Link>
              </CNavItem>
            </>
          )}

          {role === 'EMPLEADO' && (
            <CNavItem>
              <Link to={`/reportes/${sucursalId}`} className="nav-link">
                <CIcon customClassName="nav-icon" icon={cilChart} />
                Reportes
              </Link>
            </CNavItem>
          )}
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default SideBar;