import { Modal, Button } from "react-bootstrap";
import EmpresaService from "../../../services/EmpresaService";
import IEmpresa from "../../../types/Empresa";
import { useState } from "react";

interface EliminarEmpresaProps {
    show: boolean;
    onHide: () => void;
    empresa: IEmpresa | null;
  }
  
  const EliminarEmpresa: React.FC<EliminarEmpresaProps> = ({ show, onHide, empresa }) => {
      const empresaService = new EmpresaService();
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
          if (empresa && empresa.id) {
            await empresaService.delete(url + 'empresas',empresa.id.toString());
            console.log('Se ha eliminado correctamente.');
            onHide(); 
          } else {
            console.error('No se puede eliminar la empresa porque el Id es invalido.');
          }
        } catch (error) {
          console.error('Error al eliminar la empresa:', error);
          onHide();
        }
      };
    
      return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Empresa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Quieres eliminar la empresa: "{empresa?.nombre}"?</p>
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

    export default EliminarEmpresa;
