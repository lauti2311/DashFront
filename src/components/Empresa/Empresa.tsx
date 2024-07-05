/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import EmpresaService from '../../services/EmpresaService';
import '../../components/ui/Empresa/Empresa.css'; // Import the CSS file
import { useAppDispatch } from '../../hooks/redux';
import { setEmpresa } from '../../redux/slices/Empresa';
import { toggleModal } from '../../redux/slices/Modal';
import Empresa from '../../types/Empresa';
import ModalEmpresa from '../Modals/ModalEmpresa/ModalEmpresa';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EliminarEmpresa from '../Modals/ModalEmpresa/EliminarEmpresa';
import { Link } from "react-router-dom";


interface Row {
  [key: string]: any;
}

export const Empresas = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const empresaService = new EmpresaService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [empresaToEdit, setEmpresaToEdit] = useState<Empresa | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchImages = useCallback(
    async (empresaId: string) => {
      try {
        const response = await empresaService.get(
          url + "empresas/getAllImagesByEmpresaId",
          empresaId
        );

        if (Array.isArray(response) && response.length > 0) {
          return response[0].url;
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    [empresaService, url]
  );

  const fetchEmpresa = useCallback(async () => {
    try {
      const empresas = await empresaService.getAll(url + "empresas");
      const empresasConImagenes = await Promise.all(
        empresas.map(async (empresa) => {
          const imagenUrl = await fetchImages(empresa.id.toString());
          return { ...empresa, imagen: imagenUrl };
        })
      );
      dispatch(setEmpresa(empresasConImagenes));
      setFilterData(empresasConImagenes);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  }, [dispatch, empresaService, url, fetchImages]);

  useEffect(() => {
    fetchEmpresa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDeleteModal = (rowData: Row) => {
    setEmpresaToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      nombre: rowData.nombre,
      razonSocial: rowData.razonSocial,
      cuil: rowData.cuil,
      imagen: rowData.imagen.url,
    });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    fetchEmpresa();
    setDeleteModalOpen(false);
  };

  const handleAddEmpresa = () => {
    setEmpresaToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleOpenEditModal = (rowData: Row) => {
    setEmpresaToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      nombre: rowData.nombre,
      razonSocial: rowData.razonSocial,
      cuil: rowData.cuil,
      imagen: rowData.imagen,
    });
    dispatch(toggleModal({ modalName: "modal" }));
  };

  return (
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
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ minHeight: "80vh", paddingTop: "1rem" }}
        >
          <Grid item xs={12} sm={6} md={4} onClick={handleAddEmpresa}>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 3,
                borderRadius: 2,
                cursor: "pointer",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  boxShadow: 6,
                  backgroundColor: "#f5f5f5", 
                  transform: "scale(1.05)"
                },
                }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 250,
                }}
              >
                <AddIcon sx={{ fontSize: 60, marginBottom: 2 }} />
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#333",
                    marginTop: 1,
                  }}
                >
                  Agregar Empresa
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {filterData.map((empresa) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={empresa.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    boxShadow: 3,
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: 6,
                      backgroundColor: "#f5f5f5", 
                      transform: "scale(1.05)"
                    },
                  }}
                >
                  <Link
                    to={`/sucursales/${empresa.id}`}
                    style={{ textDecoration: "none", display: 'block' }}
                  >
                    {empresa.imagen !== "" && (
                      <CardMedia
                        component="img"
                        alt={empresa.nombre}
                        height="140"
                        image={empresa.imagen}
                        sx={{
                          objectFit: "cover",
                          borderRadius: "8px 8px 0 0", // Rounded corners for the top
                          maxHeight: 140,
                        }}
                      />
                    )}
                    <CardContent
                      sx={
                        empresa.imagen === ""
                          ? {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              height: "100%",
                              minHeight: 200,
                            }
                          : {}
                      }
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          textAlign: "center",
                        }}
                      >
                        {empresa.nombre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {empresa.denominacion}
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions sx={{ justifyContent: "center", padding: 1 }}>
                    <Button
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenDeleteModal(empresa);
                      }}
                      sx={{
                        color: "red",
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleOpenEditModal(empresa);
                      }}
                      sx={{
                        color: "green",
                        "&:hover": {
                          backgroundColor: "rgba(0, 128, 0, 0.1)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <EliminarEmpresa
          show={deleteModalOpen}
          onHide={handleCloseDeleteModal}
          empresa={empresaToEdit}
          //onDelete={fetchEmpresa}
        />
        <ModalEmpresa
          modalName="modal"
          getEmpresa={fetchEmpresa}
          empresaToEdit={empresaToEdit !== null ? empresaToEdit : undefined}
        />
      </Container>
    </Box>
  );
};
