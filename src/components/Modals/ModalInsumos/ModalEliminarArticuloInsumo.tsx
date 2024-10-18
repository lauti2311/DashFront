import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ArticuloInsumoService from '../../../services/ArticuloInsumoService';
import ArticuloInsumo from '../../../types/ArticuloInsumo';

interface ModalEliminarArticuloInsumoProps {
  show: boolean;
  onHide: () => void;
  articuloInsumo: ArticuloInsumo | null;
  onDeleteArticuloInsumo: (id: number) => void; // Función para actualizar la lista de insumos
}

const ModalEliminarArticuloInsumo: React.FC<ModalEliminarArticuloInsumoProps> = ({ show, onHide, articuloInsumo, onDeleteArticuloInsumo }) => {
  const articuloInsumoService = new ArticuloInsumoService();
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
      if (articuloInsumo && articuloInsumo.id) {
        await articuloInsumoService.delete(url + 'articuloInsumo', articuloInsumo.id.toString());
        console.log('Se ha eliminado correctamente.');
        onDeleteArticuloInsumo(articuloInsumo.id); // Actualizamos la lista de insumos
        onHide(); // Cerramos el modal
      } else {
        console.error('No se puede eliminar el artículo de insumo porque no se proporcionó un ID válido.');
      }
    } catch (error) {
      console.error('Error al eliminar el artículo de insumo:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Artículo de Insumo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar el artículo de insumo "{articuloInsumo?.denominacion}"?</p>
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

export default ModalEliminarArticuloInsumo;
