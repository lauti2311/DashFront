import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IEmpresa from '../../../types/Empresa';
import EmpresaService from '../../../services/EmpresaService';

interface ModalEmpresaProps {
    open: boolean;
    onClose: () => void;
    getEmpresas: () => void;
    empresaToEdit?: IEmpresa | null;
}

const ModalEmpresa: React.FC<ModalEmpresaProps> = ({ open, onClose, getEmpresas, empresaToEdit }) => {
    const empresaService = new EmpresaService();
    const [file, setFile] = useState<File | null>(null);
    const url = import.meta.env.VITE_API_URL;

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

    const handleClose = () => {
        onClose();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (empresaToEdit) {
            setFile(null); // Reset the file input when editing a new empresa
        }
    }, [empresaToEdit]);

    return (
        <Modal show={open} onHide={handleClose} size="lg" backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>{empresaToEdit ? 'Editar Empresa' : 'Agregar Empresa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={Yup.object({
                        nombre: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                        razonSocial: Yup.string().required(<span style={{ color: 'red' }}>Campo requerido</span>),
                        // add validation for other fields
                    })}
                    initialValues={initialValues}
                    onSubmit={async (values: IEmpresa) => {
                        try {
                            let newCompanyId: string | null = null;

                            if (empresaToEdit) {
                                await empresaService.put(url + "empresas", values.id.toString(), values);
                                console.log("Se ha actualizado correctamente.");
                                newCompanyId = values.id.toString();
                            } else {
                                const response = await empresaService.post(url + "empresas", values);
                                console.log("Se ha agregado correctamente.");
                                
                                newCompanyId = response.id.toString();
                            }

                            if (file && newCompanyId) {
                                const response = await empresaService.uploadFile(url + 'empresas/uploads', file, newCompanyId);
                                console.log('Upload successful:', response);
                            }
                            getEmpresas();
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
                                    <Field name="nombre" type="text" placeholder="Nombre de la Empresa" className="form-control mt-2" />
                                    <ErrorMessage name="nombre" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="razonSocial">Razón Social:</label>
                                    <Field name="razonSocial" type="text" placeholder="Razón Social" className="form-control mt-2" />
                                    <ErrorMessage name="razonSocial" className="error-message" component="div" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cuil">CUIL:</label>
                                    <Field name="cuil" type="number" placeholder="CUIL" className="form-control mt-2" />
                                    <ErrorMessage name="cuil" className="error-message" component="div" />
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

export default ModalEmpresa;
