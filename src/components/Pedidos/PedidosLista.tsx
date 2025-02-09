/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, useEffect } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
//import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import PedidoService from "../../services/PedidoService";
import Pedido from "../../types/Pedido";
import SearchBar from "../common/SearchBar";
import TableComponent from "../Table/Table";
import { setPedido } from "../../redux/slices/Pedido";
import ModalPedidoDetalle from "../Modals/ModalPedido/PedidoDetalle";
import ModalPedido from "../Modals/ModalPedido/ModalPedido";


interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

export const ListaPedidos = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const pedidoService = new PedidoService();
  const [filteredData, setFilterData] = useState<Row[]>([]);
  const [pedidoToEdit, setPedidoToEdit] = useState<Pedido | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentDetallePedidos, setCurrentDetallePedidos] = useState([]);
  const [orderDate, setOrderDate] = useState("");
  const [cliente, setCliente] = useState<string | undefined>();
  const [originalData, setOriginalData] = useState<Row[]>([]);


  const fetchPedidos = useCallback(async () => {
    try {
      const pedidos = (await pedidoService.getAll(url + 'pedido')).filter((v) => !v.eliminado);

      // Actualizar el estado con los pedidos obtenidos
      dispatch(setPedido(pedidos));
      setFilterData(pedidos);
      setOriginalData(pedidos);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
    }
  }, [dispatch, pedidoService, url]);

  useEffect(() => {
    fetchPedidos();
  }, []);
  


  const onSearch = (query: string) => {
    console.log(query)
    // Verificamos si el campo de búsqueda está vacío o no
    const isQueryEmpty = query.trim() === "";
    // Si el campo de búsqueda está vacío o es "false", mostramos todos los resultados sin filtrar
    if (isQueryEmpty) {
      setFilterData(originalData);
      return;
    }
    console.log(originalData)
    // Aplicamos la búsqueda sobre los datos filtrados
    const filtered = originalData.filter(
      (row) =>
        // Verificamos si la propiedad es una cadena antes de llamar a toLowerCase()
        (typeof row.horaEstimadaFinalizacion === "string" &&
          row.horaEstimadaFinalizacion
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (typeof row.total === "string" &&
          row.total.toLowerCase().includes(query.toLowerCase())) ||
        (typeof row.estado === "string" &&
          row.estado.toLowerCase().includes(query.toLowerCase())) ||
        (typeof row.tipoEnvio === "string" &&
          row.tipoEnvio.toLowerCase().includes(query.toLowerCase())) ||
        (typeof row.formaPago === "string" &&
          row.formaPago.toLowerCase().includes(query.toLowerCase())) ||
        (typeof row.fechaPedido === "string" &&
          row.fechaPedido.toLowerCase().includes(query.toLowerCase())) || 
        (typeof row.cliente?.nombre === "string" &&
          row.cliente?.nombre.toLowerCase().includes(query.toLowerCase())) 
    );

    // Actualizamos los datos filtrados con los resultados de la búsqueda
    setFilterData(filtered);
  };
  const handleOpenEditModal = (rowData: Row) => {
    setPedidoToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      horaEstimadaFinalizacion: rowData.horaEstimadaFinalizacion,
      total: rowData.total,
      totalCosto: rowData.totalCosto,
      estado: rowData.estado,
      tipoEnvio: rowData.tipoEnvio,
      formaPago: rowData.formaPago,
      fechaPedido: rowData.fechaPedido,
      detallePedidos: rowData.detallePedidos,
      sucursal: rowData.sucursal,
      factura: rowData.factura,
      cliente: rowData.cliente
    });
    setEditModalOpen(true);
  };
  
  const handleShow = (detallePedidos: any, fechaPedido:any, cliente: any) => {
    setCurrentDetallePedidos(detallePedidos);
    setCliente(cliente);
    setOrderDate(new Date(fechaPedido).toLocaleDateString());
    setShowModal(true);
  };
  
  const handleClose = () => {
    setShowModal(false);
    setCurrentDetallePedidos([]);
    setCliente("");
    setOrderDate("");
    fetchPedidos();
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    fetchPedidos();
  };
  
  const handleSavePedido = async (pedido: Pedido) => {
    try {
      await pedidoService.cambiarEstado(url + 'pedido', pedido.id.toString(), pedido.estado );
      setEditModalOpen(false);
      fetchPedidos();
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };
  
  const columns: Column[] = [
    { id: "horaEstimadaFinalizacion", label: "Hora Estimada Finalizacion", renderCell: (rowData) => <>{rowData.horaEstimadaFinalizacion}</> },
    { id: "cliente", label: "Cliente", renderCell: (rowData) => <>{rowData.cliente?.nombre + " " + rowData.cliente?.apellido}</> },
    { id: "telefono", label: "Teléfono", renderCell: (rowData) => <>{rowData.cliente?.telefono}</> },
    { id: "total", label: "Total", renderCell: (rowData) => <>{rowData.total}</> },
    { id: "totalCosto", label: "Total Costo", renderCell: (rowData) => <>{rowData.totalCosto}</> },
    { id: "estado", label: "Estado", renderCell: (rowData) => <> {rowData.estado}</> },
    { id: "tipoEnvio", label: "Tipo Envio", renderCell: (rowData) => <>{rowData.tipoEnvio}</> },
    { id: "formaPago", label: "Forma Pago", renderCell: (rowData) => <>{rowData.formaPago}</> },
    { id: "fechaPedido", label: "Fecha Pedido", renderCell: (rowData) => <>{rowData.fechaPedido}</> },
    {
      id: "detallePedidos",
      label: "Detalle del Pedido",
      renderCell: (rowData) => (
        <div>
          <Button sx={{ bgcolor: "#FB6376", "&:hover": { bgcolor: "#FB6376" } }} variant="contained" onClick={() => handleShow(rowData.detallePedidos, rowData.fechaPedido, rowData.cliente)}>Ver</Button>
        </div>
      ),
    },
  ];
  
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Pedidos
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
  
          <TableComponent data={filteredData} columns={columns} handleOpenDeleteModal={handleOpenEditModal} handleOpenEditModal={handleOpenEditModal} isListaPedidos={true} />
          <ModalPedidoDetalle
            show={showModal}
            handleClose={handleClose}
            pedidoDetalles={currentDetallePedidos}
            orderDate={orderDate}
            cliente={cliente}
          />
        </Container>
      </Box>
  
      <ModalPedido
        open={editModalOpen}
        onClose={handleCloseEditModal}
        pedido={pedidoToEdit}
        onSave={handleSavePedido}
      />
    </React.Fragment>
  );
}