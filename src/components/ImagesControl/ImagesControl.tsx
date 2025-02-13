import React, { useState, useEffect } from 'react';
import { Button, Carousel, Spinner } from 'react-bootstrap';
import ImagenArticuloService from '../../services/ImagenArticuloService';

interface Image {
  id: number;
  url: string;
  preview?: string; // Agregar una propiedad opcional para la previsualización
}

interface ImageControlProps {
  images: Image[];
  urlParteVariable: string; // Nueva prop para la parte variable de la URL
  onDeleteImage: (images: Image[]) => Promise<void>; // Asegúrate de que onDeleteImage acepte un array de imágenes
}

const ImageControl: React.FC<ImageControlProps> = ({ images: initialImages, urlParteVariable, onDeleteImage }) => {
  const [sliderImages, setSliderImages] = useState<Image[]>(initialImages);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar la carga
  const imagenService = new ImagenArticuloService();
  const url = import.meta.env.VITE_API_URL;

  // Actualizar el estado local cuando cambian las imágenes
  useEffect(() => {
    setSliderImages(initialImages);
  }, [initialImages]);

  const handleDeleteImage = async (publicId: string, imagenId: number) => {
    // Verificar si queda una sola imagen antes de eliminarla
    if (sliderImages.length === 1) {
      // Si queda una sola imagen, no permitir eliminarla y mostrar un mensaje
      alert("No puedes eliminar la única imagen.");
      return;
    }
    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar esta imagen?'
    );
    if (!confirmDelete) return;
  
    setIsLoading(true); // Establecer isLoading a true antes de comenzar la eliminación
  
    try {
      // Realizar eliminación de imagen
      await imagenService.deleteImage(
        `${url}${urlParteVariable}`, // Concatenar la parte variable a la URL
        publicId,
        imagenId.toString(),
      );
  
      // Actualizar el estado después de eliminar la imagen
      const updatedImages = sliderImages.filter((image) => image.id !== imagenId);
      setSliderImages(updatedImages);
      console.log('Imagen eliminada correctamente.');
      console.log(updatedImages)
      onDeleteImage(updatedImages);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    } finally {
      setIsLoading(false); // Establecer isLoading a false después de completar la operación, ya sea exitosa o con error
    }
  };
  
  return (
    <>
      {isLoading && (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '150px' }}>
          <Spinner animation="border" role="status" />
        </div>
      )}
      <Carousel 
        prevIcon={<span className="carousel-control-prev-icon" />}
        nextIcon={<span className="carousel-control-next-icon" />}
      >
        {sliderImages.map((image, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
              <img
                className="img-fluid"
                src={image.preview || image.url} // Utiliza la URL de previsualización si está disponible
                alt="Imagen"
                style={{ maxWidth: '100%', maxHeight: '80%', objectFit: 'contain' }}
              />
            </div>
            <br />
            {!image.preview && ( // No mostrar el botón de eliminar si es una URL de previsualización
              <Carousel.Caption>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteImage(image.url, image.id)}
                >
                  Eliminar
                </Button>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ImageControl;
