import { Modal, Button } from "react-bootstrap";
import SucursalService from "../../../services/Sucursal";
import ISucursal from "../../../types/Sucursal";

interface EliminarSucursalProps {
  show: boolean;
  onHide: () => void;
  sucursal: ISucursal | null;
  onDelete: () => void; // Esta función debe actualizar el estado de la interfaz de usuario
}
  
  const EliminarSucursal: React.FC<EliminarSucursalProps> = ({ show, onHide, sucursal, onDelete }) => {
      const sucursalService = new SucursalService();
      const url = import.meta.env.VITE_API_URL;
    
      const handleDelete = async () => {
        try {
          if (sucursal && sucursal.id) {
            const response = await sucursalService.delete(url + 'sucursales', sucursal.id.toString());
            console.log('Respuesta del servidor al eliminar:', response);
            console.log('Se ha eliminado correctamente.');
            onHide(); // Cerramos el modal
            onDelete(); // Actualizamos el estado de la interfaz de usuario
          } else {
            console.error('No se puede eliminar la sucursal porque no se proporcionó un ID válido.');
          }
        } catch (error) {
          console.error('Error al eliminar la sucursal:', error);
          onHide();
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
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };
    
  
  export default EliminarSucursal;