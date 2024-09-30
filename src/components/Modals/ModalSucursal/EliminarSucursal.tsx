import { Modal, Button } from "react-bootstrap";
import SucursalService from "../../../services/Sucursal";
import ISucursal from "../../../types/Sucursal";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

interface EliminarSucursalProps {
  show: boolean;
  onHide: () => void;
  sucursal: ISucursal | null;
  onDelete: () => void; // Esta función debe actualizar el estado de la interfaz de usuario
  getSucursal: () => void;

}
  
  const EliminarSucursal: React.FC<EliminarSucursalProps> = ({ show, onHide, sucursal, getSucursal, onDelete }) => {
      const sucursalService = new SucursalService();
      const url = import.meta.env.VITE_API_URL;
      const [isDeleting, setIsDeleting] = useState(false);
      const { getAccessTokenSilently } = useAuth0();

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
          if (sucursal && sucursal.id) {
            await sucursalService.delete(url + 'sucursales', sucursal.id.toString(), await getAccessTokenSilently({}));
              console.log('Se ha eliminado correctamente.');
              getSucursal();
              onDelete();
              onHide(); // Cerramos el modal
            } else {
              console.error('No se puede eliminar la sucursal porque no se proporcionó un ID válido.');
            }
          } catch (error) {
            console.error('Error al eliminar la sucursal:', error);
          }
      };

      return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Sucursal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar la sucursal "{sucursal?.denominacion}"?</p>
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
  
  export default EliminarSucursal;
  