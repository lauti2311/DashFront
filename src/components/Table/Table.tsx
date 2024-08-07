/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TablePagination, Box } from '@mui/material';

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell?: (row: Row) => React.ReactNode;
}

interface Props {
  data: Row[];
  columns: Column[];
  handleOpenEditModal: (rowData: Row) => void;
  handleOpenDeleteModal: (rowData: Row) => void;
  isListaPedidos?: boolean;
}

interface ModalContextProps {
  handleOpenEditModal: (rowData: Row) => void;
  handleOpenDeleteModal: (rowData: Row) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  handleOpenEditModal: () => {},
  handleOpenDeleteModal: () => {},
});

const TableComponent: React.FC<Props> = ({ data, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof Row>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
// corregi como anónimo
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof Row) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? data.slice().sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    })
    : data;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : 'asc'}
                  onClick={handleRequestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {/* <TableCell>Acciones</TableCell> Agregar una columna para las acciones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.renderCell ? column.renderCell(row) : row[column.id]}
                </TableCell>
              ))}
              <TableCell>
              <Box sx={{ display: 'flex', gap: 1 }}>
              {/* <IconButton aria-label="editar" onClick={() => handleOpenEditModal(row)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="eliminar" onClick={() => handleOpenDeleteModal(row)}>
                <DeleteIcon />
              </IconButton> */}
            </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableComponent;
