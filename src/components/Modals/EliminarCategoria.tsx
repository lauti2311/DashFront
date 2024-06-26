import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Categoria from '../../types/Categoria';
import CategoriaService from '../../services/CategoriaService';

interface EliminarCategoriaProps {
    show: boolean;
    categoria: Categoria | null;
    onDelete: () => void;
    onClose: () => void;
}

const EliminarCategoria: React.FC<EliminarCategoriaProps> = ({ show, categoria, onDelete, onClose }) => {
    const categoriaService = new CategoriaService();
    const url = import.meta.env.VITE_API_URL;

    const handleEliminar = async () => {
        try {
            if (categoria && categoria.id) {
                await categoriaService.delete(url + 'categorias', categoria.id.toString());
                console.log('Se ha eliminado correctamente.');
                onDelete(); // Llamamos a onDelete después de eliminar
                onClose(); // Cerramos el modal después de eliminar
            } else {
                console.error('No se puede eliminar la categoría porque no se proporcionó un ID válido.');
            }
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Quieres eliminar la siguiente categoria? "{categoria?.denominacion}"?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleEliminar}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EliminarCategoria;
