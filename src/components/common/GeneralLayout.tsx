import { Col, Row } from "react-bootstrap"
import SideBar from "./BasicSidebar"
import { Outlet } from "react-router-dom"
import BaseNavBar from "./BaseNavbar"

//Layout general
export const Layout = () => {
  return <> 
    <BaseNavBar title=""></BaseNavBar>
    <Row noGutters style={{overflow: "hidden", width: "100%"}}>
        <Col xs="auto" className="sidebar">
            <SideBar/>
        </Col>
        <Col>
        <Outlet></Outlet>
        </Col>
    </Row>
  </>
}