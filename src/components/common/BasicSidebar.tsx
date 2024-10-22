import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { cilBarChart, cilBlur, cilCart, cilFastfood, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { cilDollar } from "@coreui/icons";
import * as icon from "@coreui/icons";


const SideBar: React.FC = () => {
const { sucursalId} = useParams();
    return (
        <div>
            <CSidebar className="border-end d-flex flex-column" style={{ height: '100vh' }}>
                <CSidebarNav>
                    <CNavTitle>
                        Dashboard
                    </CNavTitle>
                    <CNavItem>
                        <Link to="/" className="nav-link" >
                            <CIcon customClassName="nav-icon" icon={cilBarChart} />
                            Inicio
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to= {`/productos/lista/${sucursalId}`} className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilFastfood} />
                         Productos
                        </Link>
                    </CNavItem>
                        <CNavItem>
                            <Link to={`/categorias/${sucursalId}`}className="nav-link">
                                <CIcon className="nav-icon" icon={cilBlur} />
                                Categorías
                            </Link>
                        </CNavItem>

                    <CNavItem>
                        <Link to={`/promociones/lista/${sucursalId}`} className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilDollar} />
                            Promociones
                        </Link>
                    </CNavItem>
                        <CNavItem>
                        <Link to={`/unidadMedida/${sucursalId}`} className="nav-link">
                        <CIcon customClassName="nav-icon" icon={icon.cilMediaStop} />
                            Unidades de Medida
                            </Link>
                        </CNavItem>
                    <CNavItem>
                    <Link to={`/usuarios/${sucursalId}`} className="nav-link">
                    <CIcon customClassName="nav-icon" icon={cilUser} />
                        Usuarios
                    </Link>
                </CNavItem>
                    <CNavItem>
                        <Link to={`/articuloInsumo/lista/${sucursalId}`} className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCart} />
                            Insumos
                        </Link>
                    </CNavItem>
                    <CNavItem>
                    <Link to={`/pedidos/${sucursalId}`} className="nav-link">
                        <CIcon customClassName="nav-icon" icon={icon.cilApps} />
                        Pedidos
                    </Link>
                    </CNavItem>
                    <CNavItem>
                    <Link to={`/reportes/${sucursalId}`} className="nav-link">
                        <CIcon customClassName="nav-icon" icon={icon.cilChart} />
                        Reportes
                    </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>

        
    );
}

export default SideBar;