/* eslint-disable @typescript-eslint/no-explicit-any */
import {Col, Row} from "react-bootstrap";
import {Chart} from "react-google-charts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PedidoService from "../../services/PedidoService";

export const Graficos = () => {

    const { sucursalId } = useParams();
    const url = import.meta.env.VITE_API_URL;
    const pedidoService = new PedidoService();
    const [dataRankingInsumos, setDataRankingInsumos] = useState<any>();
    const [dataPedidosPorCliente, setDataPedidosPorCliente] = useState<any>();
    const [dataIngresos, setDataIngresos] = useState<any>();
    const [dataGanancias, setDataGanancias] = useState<any>();

    const getChartRankingInsumos =  async () => {
        setDataRankingInsumos([
            ["Articulo", "Cantidad"],
            ...(await pedidoService.getRankingInsumos(url, sucursalId))
        ]);
    }

    const getPedidosPorCliente =  async () => {
        setDataPedidosPorCliente([
            ["Cliente", "Cantidad"],
            ...(await pedidoService.getPedidosPorCliente(url, sucursalId))
        ]);
    }

    const getIngresos =  async () => {
        setDataIngresos([
            ["Dia", "Cantidad"],
            ...(await pedidoService.getIngresos(url, sucursalId))
        ]);
    }

    const getGanancias =  async () => {
        setDataGanancias([
            ["Dia", "Cantidad"],
            ...(await pedidoService.getGanancias(url, sucursalId))
        ]);
    }

    const options = {
      colors: ['#fb6376', '#3b82f6', '#facc15', '#10b981', '#a855f7']
    }

    useEffect(() => {
        getChartRankingInsumos();
        getPedidosPorCliente();
        getIngresos();
        getGanancias();
    }, []);

    return (
        <>
          <h2>Reportes históricos</h2>
          <Row className={"p-3"}>
            <Col md={6}>
              <h4>Insumos vendidos</h4>
              {
                !dataRankingInsumos
                ? <div style={{height: "200px"}} className="d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                </div>
                : <Chart
                  chartType="PieChart"
                  data={dataRankingInsumos}
                  width={"100%"}
                  options={options}
                />
              }
            </Col>
            <Col md={6}>
              <h4>Pedidos por cliente</h4>
              {
                !dataPedidosPorCliente
                ? <div style={{height: "200px"}} className="d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                </div>
                : <Chart
                  chartType="PieChart"
                  data={dataPedidosPorCliente}
                  width={"100%"}
                  options={options}
                />
              }
            </Col>
          </Row>
          <Row className={"p-2"}>
            <Col md={6}>
              <h4>Ingresos</h4>
              {
                !dataIngresos
                ? <div style={{height: "200px"}} className="d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                </div>
                : <Chart
                  chartType="Bar"
                  data={dataIngresos}
                  width={"100%"}
                  options={options}
                />
              }
            </Col>
            <Col md={6}>
              <h4>Ganancias</h4>
              {
                !dataGanancias
                ? <div style={{height: "200px"}} className="d-flex flex-column justify-content-center align-items-center">
                  <div className="spinner-border" role="status"></div>
                </div>
                : <Chart
                  chartType="Bar"
                  data={dataGanancias}
                  width={"100%"}
                  options={options}
                />
              }
            </Col>
          </Row>
        </>
      );
    };