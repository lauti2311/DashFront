// EmpresaModal.tsx
import React, { ChangeEvent, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ISucursal from '../../../types/Sucursal';
import SucursalService from '../../../services/SucursalService';

interface ModalSucursalProps {
    open: boolean;
    onClose: () => void;
    getSucursales: () => void;
    sucursalToEdit?: ISucursal | null;
}

const ModalSucursal: React.FC<ModalSucursalProps> = ({ open, onClose, getSucursales, sucursalToEdit }) => {
    const sucursalService = new SucursalService();
    const [file, setFile] = useState<File | null>(null);
    const url = import.meta.env.VITE_API_URL;

    const initialValues: ISucursal = sucursalToEdit
        ? { ...sucursalToEdit }
        : {
            id: 0,
            nombre: "",
            horarioApertura: "",
            horarioCierre: "",
            esCasaMatriz: false,
            imagen: {
                name: "",
                url: "",
                eliminado: false,
                id: 0
            },
            domicilio: {
                calle: "",
                numero: 0,
                ciudad: "",
                provincia: "",
                pais: "",
                codigoPostal: ""
            },
            empresa: {
                id: 0,
                nombre: "",
                cuit: "",
                razonSocial: "",
                domicilio: {
                    calle: "",
                    numero: 0,
                    ciudad: "",
                    provincia: "",
                    pais: "",
                    codigoPostal: ""
                }
            },
            eliminado: false
        };

    const handleClose = () => {
        onClose();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Modal show={open} onHide={handleClose} size="lg" backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>{sucursalToEdit ? 'Editar Sucursal' : 'Agregar Sucursal'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={Yup.object({
                        nombre: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                        horarioApertura: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                        horarioCierre: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                        domicilio: Yup.object().shape({
                            calle: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                            numero: Yup.number().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                            ciudad: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                            provincia: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                            pais: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                            codigoPostal: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>)
                        })
                    })}
                    initialValues={initialValues}
                    onSubmit={async (values: ISucursal) => {
                        try {
                            let newCompanyId: string | null = null; // Cambiado de const a let

                            if (sucursalToEdit) {
                                await sucursalService.put(url + "sucursales", values.id.toString(), values);
                                console.log("Se ha actualizado correctamente.");
                                newCompanyId = values.id.toString();
                            } else {
                                const response = await sucursalService.post(url + "sucursales", values);
                                console.log("Se ha agregado correctamente.");

                                // Obtener el id de la nueva empresa desde la respuesta
                                newCompanyId = response.id.toString(); // Convertir a string
                            }

                            // Verificar si hay un archivo seleccionado para cargar
                            if (file && newCompanyId) {
                                const response = await sucursalService.uploadFile(url + 'sucursales/uploads', file, newCompanyId);
                                console.log('Upload successful:', response);
                            }
                            getSucursales();
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
                                    <Field name="nombre" type="text" placeholder="Nombre de la Sucursal" className="form-control mt-2" />
                                    <ErrorMessage name="nombre" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="horarioApertura">Horario de Apertura:</label>
                                    <Field name="horarioApertura" type="text" placeholder="Horario de Apertura" className="form-control mt-2" />
                                    <ErrorMessage name="horarioApertura" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="horarioCierre">Horario de Cierre:</label>
                                    <Field name="horarioCierre" type="text" placeholder="Horario de Cierre" className="form-control mt-2" />
                                    <ErrorMessage name="horarioCierre" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="esCasaMatriz">Es Casa Matriz:</label>
                                    <Field name="esCasaMatriz" type="checkbox" className="form-control mt-2" />
                                    <ErrorMessage name="esCasaMatriz" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.calle">Calle:</label>
                                    <Field name="domicilio.calle" type="text" placeholder="Calle" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.calle" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.numero">Número:</label>
                                    <Field name="domicilio.numero" type="number" placeholder="Número" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.numero" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.ciudad">Ciudad:</label>
                                    <Field name="domicilio.ciudad" type="text" placeholder="Ciudad" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.ciudad" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.provincia">Provincia:</label>
                                    <Field name="domicilio.provincia" type="text" placeholder="Provincia" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.provincia" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.pais">País:</label>
                                    <Field name="domicilio.pais" type="text" placeholder="País" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.pais" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="domicilio.codigoPostal">Código Postal:</label>
                                    <Field name="domicilio.codigoPostal" type="text" placeholder="Código Postal" className="form-control mt-2" />
                                    <ErrorMessage name="domicilio.codigoPostal" className="error-message" component="div" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="imagen">Elegir Imagen:</label>
                                    <br />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                    <ErrorMessage name="imagen" className="error-message" component="div" />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button variant="outline-success" type="submit" className="custom-button">
                                        Enviar
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

export default ModalSucursal;
