/* eslint-disable @typescript-eslint/no-explicit-any */
// EmpresaModal.tsx
import React, { ChangeEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmpresaService from '../../../services/EmpresaService';import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { toggleModal } from '../../../redux/slices/Modal';
import IEmpresa from '../../../types/Empresa';
import { useAuth0 } from '@auth0/auth0-react';
import ImageControl from '../../ImagesControl/ImagesControl';
import IImagenes from '../../../types/Imagenes';

interface ModalEmpresaProps {
    getEmpresa: () => void;
    empresaToEdit?: IEmpresa;
    modalName: string;
  }
  
  const ModalEmpresa: React.FC<ModalEmpresaProps> = ({ modalName, getEmpresa, empresaToEdit }) => {
    const empresaService = new EmpresaService();
    const url = import.meta.env.VITE_API_URL;
    const { getAccessTokenSilently } = useAuth0();
    const [file, setFile] = useState<File[]>([]);
  
  
    const initialValues: IEmpresa = empresaToEdit
      ? {
          ...empresaToEdit,
          imagen: {
            name: "",
            url: "",
            eliminado: false,
            id: 0  // Asegúrate de proporcionar un valor para 'id'
          },
          imagenes: [] // Add an empty array for the 'imagenes' property
        }
      : {
          id: 0,
          eliminado: false,
          nombre: "",
          razonSocial: "",
          cuil: 0,
          imagen: {
            name: "",
            url: "",
            eliminado: false,
            id: 0  // Asegúrate de proporcionar un valor para 'id'
          },
          imagenes: [] // Add an empty array for the 'imagenes' property
        };
  
  
    const modal = useAppSelector((state) => state.modal[modalName]);
    const dispatch = useAppDispatch();
  
    const handleClose = () => {
      dispatch(toggleModal({ modalName: "modal" }));
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFieldValue: any, existingImages: IImagenes[]) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFilesArray = Array.from(e.target.files).map((file) => ({
          file: file,
          name: file.name, // Agregar el nombre del archivo
          preview: URL.createObjectURL(file),
        }));
    
        // Combinar imágenes existentes con las nuevas imágenes seleccionadas
        const combinedImages = [...existingImages, ...newFilesArray];
        setFieldValue("imagenes", combinedImages);
        setFile(Array.from(e.target.files));
      }
    };

    const handleUpload = async (articuloId: string) => {
      if (file.length > 0 && articuloId) {
        try {
          const accessToken = await getAccessTokenSilently({});
          const uploadPromises = file.map(file =>
            empresaService.uploadFile(
              `${url}empresas/uploads`,
              file,
              articuloId,
              accessToken
            )
          );
          const responses = await Promise.all(uploadPromises);
          console.log("Upload successful:", responses);
        } catch (error) {
          console.error("Error uploading files:", error);
        }
        getEmpresa(); 
      } else {
        console.log("No files or articuloId not set.");
      }
    };
    
    const handleDeleteImage = async (images: any[], setFieldValue: any) => {
      try {
        console.log(images);
        // Lógica para eliminar la imagen, por ejemplo, llamando a un servicio
        console.log('Eliminar imagen');
        // Actualizar values.imagenes eliminando la imagen correspondiente
        // Llamar a setFieldValue para actualizar el estado con las imágenes actualizadas
        setFieldValue("imagenes", images);
        console.log(images)
        getEmpresa(); 
        console.log('Imagen eliminada correctamente.');
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    };

    
    return (
      <Modal
        id={"modal"}
        show={modal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{empresaToEdit ? "Editar Empresa" : "Agregar Empresa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={Yup.object({
              nombre: Yup.string().required("Campo requerido"),
              razonSocial: Yup.string().required("Campo requerido"),
              cuil: Yup.number().required("Campo requerido"),
              imagenes: Yup.array().min(1, "Debe agregar al menos una imagen").required("Campo requerido")
            })}
            initialValues={initialValues}
            onSubmit={async (values: IEmpresa) => {
              console.log(values)
              try {
                let newCompanyId: string | null = null; // Cambiado de const a let
  
                if (empresaToEdit) {
                  await empresaService.put(url + "empresas", values.id.toString(), values, await getAccessTokenSilently());
                  console.log("Se ha actualizado correctamente.");
                  newCompanyId = values.id.toString();
                  if (file.length > 0 && newCompanyId) {
                    handleUpload(newCompanyId);
                  } 
                } else {
                  values.imagenes = [];
                  const response = await empresaService.post(url + "empresas", values, await getAccessTokenSilently());
                  console.log("Se ha agregado correctamente.");
            
                  // Obtener el id de la nueva empresa desde la respuesta
                  newCompanyId = response.id.toString();
                  if (file.length > 0 && newCompanyId) {
                  handleUpload(newCompanyId);
                } // Convertir a string
                }
                getEmpresa();
                handleClose();
            
                // Verificar si hay un archivo seleccionado para cargar
                // if (file && newCompanyId) {
                //   const response = await empresaService.uploadFile(url + 'empresas/uploads', file, newCompanyId);
                //   console.log('Upload successful:', response);
                // }
            
                // getEmpresa(); 
                // handleClose(); 
              } catch (error) {
                console.error("Error al realizar la operación:", error);
              }
            }}
            
          >
            {({values, isSubmitting, setFieldValue}) => (
              <>
                <Form autoComplete="off">
                  <div className="mb-4">
                    <label htmlFor="nombre">Nombre:</label>
                    <Field
                      name="nombre"
                      type="text"
                      placeholder="Nombre"
                      className="form-control mt-2"
                    />
                    <ErrorMessage
                      name="nombre"
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="razonSocial">Razon social:</label>
                    <Field
                      name="razonSocial"
                      type="text"
                      placeholder="Razon social"
                      className="form-control mt-2"
                    />
                    <ErrorMessage
                      name="razonSocial"
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="cuil">Cuil:</label>
                    <Field
                      name="cuil"
                      type="number"
                      className="form-control mt-2"
                    />
                    <ErrorMessage
                      name="cuil"
                      className="error-message"
                      component="div"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="logo">Logo:</label>
                    <br />
                    <input
                      type="file"
                      onChange={(event) =>handleFileChange(event, setFieldValue, values.imagenes)}
                      multiple
                    />
                  </div>
                  {values.imagenes.length > 0 && (
                  <div className="mb-4">
                    <ImageControl images={values.imagenes} urlParteVariable="empresa" 
                    onDeleteImage={(images) => handleDeleteImage(images, setFieldValue)}
                    />
                  </div>
                )}
                   <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="me-2"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </Form>
            </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };
  

export default ModalEmpresa;
