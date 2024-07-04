import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { cilBarChart, cilCart, cilFastfood, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavItem, CNavTitle, CSidebar, CSidebarNav } from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { cilDollar } from "@coreui/icons";


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

                    {/* <CNavItem>
                        <Link to="/empresas" className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilBuilding} />
                            Empresa
                        </Link>
                    </CNavItem> */}
                    <CNavItem>
                        <Link to= {`/productos/lista/${sucursalId}`} className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilFastfood} />
                         Productos
                        </Link>
                    </CNavItem>
                        <CNavItem>
                            <Link to={`/categorias/${sucursalId}`}className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
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
                            <Link to="/empleados" className="nav-link" >
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Lista de Empleados
                            </Link>
                        </CNavItem>
                        <CNavItem>
                            <Link to="/roles" className="nav-link">
                                <span className="nav-icon"><span className="nav-icon-bullet"></span></span>
                                Roles
                            </Link>
                        </CNavItem>
                    <CNavItem>
                    <Link to="/usuario" className="nav-link">
                        <CIcon customClassName="nav-icon" icon={cilUser} />
                        Usuario
                    </Link>
                </CNavItem>
                    <CNavItem>
                        <Link to={`/articuloInsumo/lista/${sucursalId}`} className="nav-link">
                            <CIcon customClassName="nav-icon" icon={cilCart} />
                            Insumos
                        </Link>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>

        
    );
}

export default SideBar;
