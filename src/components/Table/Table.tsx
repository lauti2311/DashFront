/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { TablePagination, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from 'react-bootstrap';
import PedidoService from '../../services/PedidoService';
import { Estado } from '../../types/enums/Estado';

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

interface Props {
  data: Row[];
  columns: Column[];
  handleOpenEditModal: (rowData: Row) => void;
  handleOpenDeleteModal: (rowData: Row) => void; // Nueva prop para manejar la apertura de la modal de eliminación
  isListaPedidos?: boolean;
}

const TableComponent: React.FC<Props> = ({ data, columns, handleOpenEditModal, handleOpenDeleteModal, isListaPedidos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const url = import.meta.env.VITE_API_URL;
  const [facturaCreada, setFacturaCreada] = useState(false);
  const pedidoService = new PedidoService();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const crearFactura = async (pedidoId: string, clienteEmail: string) => {
    try {
      await pedidoService.crearFactura(url, pedidoId);
      setFacturaCreada(true);
      enviarFactura(pedidoId, clienteEmail);
    } catch (error) {
      console.error('Error al crear la factura:', error);
    }
  };

  const enviarFactura = async (pedidoId: string, userEmail: string) => {
    try {
      await pedidoService.enviarFactura(url, pedidoId, userEmail);
      alert('Factura enviada por correo electrónico');
    } catch (error) {
      console.error('Error al enviar la factura:', error);
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table responsive">
          <thead>
            <tr>
              {columns.map((column) => (
                <th className='text-center' key={column.id}>{column.label}</th>
              ))}
              <th className='text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td className='text-center' key={column.id}>
                    {column.renderCell ? column.renderCell(row) : row[column.id]}
                  </td>
                ))}
                <td>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton aria-label="editar" onClick={() => handleOpenEditModal(row)}>
                      <EditIcon />
                    </IconButton>
                    {isListaPedidos && row.estado === Estado.FACTURADO && !row.factura && (
                      <Button
                        className="btn btn-primary"
                        onClick={() => crearFactura(row.id, row.cliente.email)}
                        style={{ backgroundColor: "#FB6376", borderColor: "#FB6376", color: "#fff" }}
                      >
                        Generar Factura
                      </Button>
                    )}
                    {!isListaPedidos && (
                      <IconButton aria-label="eliminar" onClick={() => handleOpenDeleteModal(row)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default TableComponent;
