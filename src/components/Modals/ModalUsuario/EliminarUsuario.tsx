import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UsuarioService from '../../../services/UsuarioService';
import Usuario from '../../../types/Usuario';

interface EliminarUsuarioProps {
  show: boolean;
  onHide: () => void;
  usuario: Usuario | null;
  onDelete: (usuarioId: string) => void; // Modifica la firma de onDelete para aceptar un parámetro de tipo string
}

const EliminarUsuario: React.FC<EliminarUsuarioProps> = ({ show, onHide, usuario }) => {
  const usuarioService = new UsuarioService();
  const url = import.meta.env.VITE_API_URL;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      if (usuario && usuario.id) {
        await usuarioService.delete(url + 'usuarios', usuario.id.toString());
        console.log('Se ha eliminado el usuario correctamente.');
        onHide(); // Cerramos el modal
      } else {
        console.error('No se puede eliminar el usuario porque no se proporcionó un ID válido.');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleDeleteClick = async () => {
    setIsDeleting(true);
    try {
      await handleDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar al usuario "{usuario?.username}"?</p>
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

export default EliminarUsuario;
