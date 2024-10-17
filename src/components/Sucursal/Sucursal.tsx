/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";

import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../../hooks/redux";
import { toggleModal } from "../../redux/slices/Modal";
import { setSucursal } from "../../redux/slices/Sucursal";
import EmpresaService from "../../services/EmpresaService";
import SucursalService from "../../services/Sucursal";
import Sucursal from "../../types/Sucursal";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import EliminarSucursal from "../Modals/ModalSucursal/EliminarSucursal";
import ModalSucursal from "../Modals/ModalSucursal/ModalSucursal";
import { BaseNavBar } from "../common/BaseNavbar";

interface Row {
  [key: string]: any;
}

export const Sucursales = () => {
  const url = import.meta.env.VITE_API_URL;
  const { empresaId } = useParams();
  const dispatch = useAppDispatch();
  const sucursalService = new SucursalService();
  const empresaService = new EmpresaService();
  const [filterData, setFilterData] = useState<Row[]>([]);
  const [sucursalToEdit, setSucursalToEdit] = useState<Sucursal | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [casaMatriz, setCasaMatriz] = useState(false);


  const fetchEmpresa = useCallback(async () => {
    try {
      if (empresaId) {
        const empresa = await empresaService.get(url + "empresas", empresaId);
        console.log("Detalles de la empresa:", empresa);
      }
    } catch (error) {
      console.error("Error al obtener los detalles de la empresa:", error);
    }
  }, [empresaService, empresaId, url]);

  const fetchImages = useCallback(
    async (sucursalId: string) => {
      try {
        const response = await sucursalService.get(
          url + "sucursales/getAllImagesBySucursalId",
          sucursalId,
        );

        if (Array.isArray(response) && response.length > 0) {
          return response[0].url; // Devuelve la URL de la primera imagen
        }
        return "";
      } catch (error) {
        return "";
      }
    },
    [sucursalService, url]
  );

  // const fetchSucursal = useCallback(async () => {
  //   try {
  //     const sucursales = await sucursalService.getAll(url + "sucursales");
  //     const sucursalesConImagenes = await Promise.all(
  //       sucursales.map(async (sucursal) => {
  //         const imagenUrl = await fetchImages(sucursal.id.toString());
  //         return { ...sucursal, imagen: imagenUrl };
  //       })
  //     );

  //     const sucursalesFiltradas = sucursalesConImagenes.filter(
  //       (sucursal) => sucursal.empresa.id.toString() === empresaId
  //     );

  //     // Verificar si alguna de las sucursales filtradas es casa matriz
  //     const empresaTieneCasaMatriz = sucursalesFiltradas.some(
  //       (sucursal) => sucursal.esCasaMatriz === true
  //     );
  //     setCasaMatriz(empresaTieneCasaMatriz);

  //     dispatch(setSucursal(sucursalesFiltradas));
  //     setFilterData(sucursalesFiltradas);
  //   } catch (error) {
  //     console.error("Error al obtener las sucursales:", error);
  //   }
  // }, [dispatch, sucursalService, url, fetchImages, empresaId]);

  const fetchSucursal = useCallback(async () => {
    try {
      if (empresaId) {
        const empresaIdNumber = parseInt(empresaId);

        const sucursalesEmpresa = await sucursalService.sucursalEmpresa(url, empresaIdNumber);

        // Verificar si alguna de las sucursales filtradas es casa matriz
        const empresaTieneCasaMatriz = sucursalesEmpresa.some(
          (sucursal) => sucursal.esCasaMatriz === true
        );
        const sucursalesConImagenes = await Promise.all(
          sucursalesEmpresa.map(async (sucursal) => {
            const imagenUrl = await fetchImages(sucursal.id.toString());
            return { ...sucursal, imagen: imagenUrl };
          })
        );
        setCasaMatriz(empresaTieneCasaMatriz);

        dispatch(setSucursal(sucursalesConImagenes));
        setFilterData(sucursalesConImagenes);
      }
    } catch (error) {
      console.error("Error al obtener las sucursales:", error);
    }
  }, [dispatch, sucursalService, url, fetchImages, empresaId]);

  useEffect(() => {
    fetchSucursal();
    fetchEmpresa();
  }, []);

  const handleOpenDeleteModal = (rowData: Row) => {
    setSucursalToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      nombre: rowData.nombre,
      imagenes: rowData.imagenes,
      horarioApertura: rowData.horarioApertura,
      horarioCierre: rowData.horarioCierre,
      esCasaMatriz: rowData.esCasaMatriz,
      domicilio: rowData.domicilio,
      empresa: rowData.empresa,
    });
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (sucursalToEdit && sucursalToEdit.id) {
        await sucursalService.delete(
          url + "sucursales",
          sucursalToEdit.id.toString(),
        );
        console.log("Se ha eliminado correctamente.");

        // Actualizar localmente el estado filterData eliminando la sucursal
        setFilterData((prevData) =>
          prevData.filter((sucursal) => sucursal.id !== sucursalToEdit.id)
        );

        handleCloseDeleteModal();
      } else {
        console.error(
          "No se puede eliminar la sucursal porque no se proporcionó un ID válido."
        );
      }
    } catch (error) {
      console.error("Error al eliminar la sucursal:", error);
    }
  };



  const handleOpenEditModal = (rowData: Row) => {
    console.log(rowData);
    setSucursalToEdit({
      id: rowData.id,
      eliminado: rowData.eliminado,
      nombre: rowData.nombre,
      imagenes: rowData.imagenes,
      horarioApertura: rowData.horarioApertura,
      horarioCierre: rowData.horarioCierre,
      esCasaMatriz: rowData.esCasaMatriz,
      domicilio: rowData.domicilio,
      empresa: rowData.empresa,
    });
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const handleAddSucursal = () => {
    setSucursalToEdit(null);
    dispatch(toggleModal({ modalName: "modal" }));
  };


  return (
    <>
      <BaseNavBar title="Sucursales"></BaseNavBar>
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
            {
                <Grid item xs={12} sm={6} md={4} onClick={handleAddSucursal}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      boxShadow: 3,
                      borderRadius: 16,
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)" },
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
                      <AddIcon sx={{ fontSize: 48, marginBottom: 1, color: "#1976d2" }} />
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
                        Agregar Sucursal
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

            }

            {filterData.map((sucursal) => (
              <Grid item xs={12} sm={6} md={4} key={sucursal.id}>
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
                  {sucursal.imagenes && sucursal.imagenes.length > 0 && sucursal.imagenes[0].url !== "" && (
                        <CardMedia
                          component="img"
                          alt={sucursal.nombre}
                          height="140"
                          image={sucursal.imagenes[sucursal.imagenes.length - 1].url} // Mostrar la última imagen
                          sx={{
                              objectFit: "contain",
                              borderRadius: "16px 16px 0 0",
                              maxHeight: 140,
                              width: "100%", // Asegura que la imagen tome el ancho completo del contenedor
                          }}
                        />
                    )}

                  <CardContent
                    sx={
                      sucursal.imagen === ""
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
                    <Link
                      to={`/inicio/${sucursal.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          color: "#1976d2",
                          textAlign: "center",
                        }}
                      >
                        {sucursal.nombre}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      {sucursal.razonSocial}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        size="small"
                        onClick={() => handleOpenDeleteModal(sucursal)}
                      >
                        <DeleteIcon style={{ color: "red" }} />{" "}
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleOpenEditModal(sucursal)}
                      >
                        <EditIcon style={{ color: "green" }} />{" "}
                      </Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <EliminarSucursal
            getSucursal={fetchSucursal}
            show={deleteModalOpen}
            onHide={handleCloseDeleteModal}
            sucursal={sucursalToEdit}
            onDelete={handleDelete}
          />
          <ModalSucursal
            modalName="modal"
            getSucursal={fetchSucursal}
            sucursalToEdit={sucursalToEdit !== null ? sucursalToEdit : undefined}
            empresaTieneCasaMatriz={casaMatriz}
          />
        </Container>
      </Box>
    </>
  );
};
