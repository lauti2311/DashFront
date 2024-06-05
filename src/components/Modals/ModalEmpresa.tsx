// EmpresaModal.tsx
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import IEmpresa from '../../types/Empresa';
import EmpresaService from '../../services/EmpresaService';

interface ModalEmpresaProps {
    open: boolean;
    onClose: () => void;
    getEmpresas: () => void;
    empresaToEdit?: IEmpresa | null;
}

const ModalEmpresa: React.FC<ModalEmpresaProps> = ({ open, onClose, getEmpresas, empresaToEdit }) => {
    const empresaService = new EmpresaService();
    const url = import.meta.env.VITE_API_URL;

    const initialValues: IEmpresa = empresaToEdit
        ? empresaToEdit
        : {
            id: 0,
            eliminado: false,
            cuil: 0,
            nombre: '',
            razonSocial: '',
            imagen: { url: '', name: '' },
        };

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal show={open} onHide={handleClose} size="lg" backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>{empresaToEdit ? 'Editar Empresa' : 'Agregar Empresa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    validationSchema={Yup.object({
                        nombre: Yup.string().required('Campo requerido'),
                        razonSocial: Yup.string().required('Campo requerido'),
                        // add validation for other fields
                    })}
                    initialValues={initialValues}
                    onSubmit={async (values: IEmpresa) => {
                        try {
                            if (empresaToEdit) {
                                await empresaService.put(url + 'empresas', values.id.toString(), values);
                                console.log('Empresa actualizada correctamente.');
                            } else {
                                await empresaService.post(url + 'empresas', values);
                                console.log('Empresa agregada correctamente.');
                            }
                            getEmpresas();
                            handleClose();
                        } catch (error) {
                            console.error('Error al realizar la operación:', error);
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
