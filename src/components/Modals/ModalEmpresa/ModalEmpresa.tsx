// EmpresaModal.tsx
import React, { ChangeEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EmpresaService from '../../../services/EmpresaService';import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { toggleModal } from '../../../redux/slices/Modal';
import IEmpresa from '../../../types/Empresa';

interface ModalEmpresaProps {
    getEmpresa: () => void;
    empresaToEdit?: IEmpresa;
    modalName: string;
  }
  
  const ModalEmpresa: React.FC<ModalEmpresaProps> = ({ modalName, getEmpresa, empresaToEdit }) => {
    const empresaService = new EmpresaService();
    const url = import.meta.env.VITE_API_URL;
    const [file, setFile] = useState<File | null>(null);
  
  
    const initialValues: IEmpresa = empresaToEdit
    ? {
        ...empresaToEdit,
        imagen: {
          name: "",
          url: "",
          eliminado: false,
          id: 0  // Asegúrate de proporcionar un valor para 'id'
        }
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
        }
      };
  
  
    const modal = useAppSelector((state) => state.modal[modalName]);
    const dispatch = useAppDispatch();
  
    const handleClose = () => {
      dispatch(toggleModal({ modalName: "modal" }));
    };
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
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
              cuil: Yup.number().required("Campo requerido")
            })}
            initialValues={initialValues}
            onSubmit={async (values: IEmpresa) => {
              console.log(values)
              try {
                let newCompanyId: string | null = null; // Cambiado de const a let
  
                if (empresaToEdit) {
                  await empresaService.put(url + "empresas", values.id.toString(), values);
                  console.log("Se ha actualizado correctamente.");
                  newCompanyId = values.id.toString();
                } else {
                  const response = await empresaService.post(url + "empresas", values);
                  console.log("Se ha agregado correctamente.");
            
                  // Obtener el id de la nueva empresa desde la respuesta
                  newCompanyId = response.id.toString(); // Convertir a string
                }
            
                // Verificar si hay un archivo seleccionado para cargar
                if (file && newCompanyId) {
                  const response = await empresaService.uploadFile(url + 'empresas/uploads', file, newCompanyId);
                  console.log('Upload successful:', response);
                }
            
                getEmpresa(); 
                handleClose(); 
              } catch (error) {
                console.error("Error al realizar la operación:", error);
              }
            }}
            
          >
            {() => (
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
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                  <Button
                      variant="outline-secondary"
                      type="submit"
                      className="custom-button"
                      
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant="outline-success"
                      type="submit"
                      className="custom-button"
                    >
                      Añadir
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
