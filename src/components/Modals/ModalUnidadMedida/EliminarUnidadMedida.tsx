import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UnidadMedida from '../../../types/UnidadMedida';
import UnidadMedidaService from '../../../services/UnidadMedidaService';

interface EliminarUnidadMedidaProps {
  show: boolean;
  onHide: () => void;
  unidad: UnidadMedida | null;
  onDelete: () => void;
}

const EliminarUnidadMedida: React.FC<EliminarUnidadMedidaProps> = ({ show, onHide, unidad, onDelete }) => {
    const unidadMedidaService = new UnidadMedidaService();
    const url = import.meta.env.VITE_API_URL;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
      setIsDeleting(true);
      try {
        await handleDelete();
      } finally {
        setIsDeleting(false);
      }
    };
    const handleDelete = async () => {
      try {
        if (unidad && unidad.id) {
          await unidadMedidaService.delete(url + 'unidadMedida', unidad.id.toString());
          console.log('Se ha eliminado correctamente.');
          onDelete(); // Actualiza la lista de unidades de medida
          onHide(); // Cerramos el modal
        } else {
          console.error('No se puede eliminar la unidad de medida porque no se proporcionó un ID válido.');
        }
      } catch (error) {
        console.error('Error al eliminar la unidad de medida:', error);
      }
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Unidad de Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar la unidad de medida "{unidad?.denominacion}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button className='text-light' variant="danger" onClick={handleDeleteClick} disabled={isDeleting}>
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
export default EliminarUnidadMedida;
