/* eslint-disable @typescript-eslint/no-explicit-any */
import {Col, Row, Form} from "react-bootstrap";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { Graficos } from "../Graficos/Graficos";

export const Reportes = () => {

    const { sucursalId } = useParams();

    const [desde, setDesde] = useState<any>();
    const [hasta, setHasta] = useState<any>();


    const generarExcel = (sucursalId: string | undefined, desde: any, hasta: any, type: string) => {

        console.log(desde, hasta)

        if(!(desde && hasta)) {
            alert("Complete el desde y hasta para generar el informe")
            return;
        }

        desde = new Date(desde?.target?.value).toISOString();
        hasta = new Date(hasta?.target?.value).toISOString()

        window.open(`http://localhost:8080/pedido/${type}/${sucursalId}?desde=${desde}&hasta=${hasta}`, "_blank");
    }



    return (
        <>
            <div style={{ padding: "1rem", overflowX: "hidden" }}>
                <h2>Reportes basados en tiempo</h2>
                <p>En formato XLSX</p>
                <Row>
                    <Col>
                        <div>
                            <Form.Label htmlFor="inputDesde">Desde</Form.Label>
                            <Form.Control
                                type="date"
                                id="desde"
                                aria-describedby="desde"
                                onChange={(e) => setDesde(e.target.value)}
                            />
                            <Form.Text id="desde" muted>
                                Ingrese la fecha desde para generar el reporte
                            </Form.Text>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Form.Label htmlFor="inputHasta">Hasta</Form.Label>
                            <Form.Control
                                type="date"
                                id="hasta"
                                aria-describedby="hasta"
                                onChange={(e) => setHasta(e.target.value)}
                            />
                            <Form.Text id="hasta" muted>
                                Ingrese la fecha hasta para generar el reporte
                            </Form.Text>
                        </div>
                    </Col>
                </Row>
                <Row className={"p-3"}>
                    <Col>
                        <a className="btn btn-primary text-light col-md-12"
                            onClick={() => generarExcel(sucursalId, desde, hasta, 'ranking/insumos/excel')}>Descargar ranking productos</a>
                    </Col>
                    <Col>
                        <a className="btn btn-primary text-light col-md-12"
                            onClick={() => generarExcel(sucursalId, desde, hasta, 'ranking/pedidos/cliente/excel')}>Descargar pedidos por cliente</a>
                    </Col>
                </Row>
                <Row className={"p-3"}>
                    <Col>
                        <a className="btn btn-primary text-light col-md-12"
                            onClick={() => generarExcel(sucursalId, desde, hasta, 'ranking/ingresos/excel')}>Descargar ingresos</a>
                    </Col>
                    <Col>
                        <a className="btn btn-primary text-light col-md-12"
                            onClick={() => generarExcel(sucursalId, desde, hasta, 'ranking/ganancias/excel')}>Descargar ganancias</a>
                    </Col>
                </Row>
                <hr/>
                <Graficos />
            </div>
        </>
    );
}