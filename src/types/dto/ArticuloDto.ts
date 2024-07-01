import DataModel from "../DataModel";
import Imagenes from "../Imagenes";
import IUnidadMedida from "../UnidadMedida";
import CategoriaDto from "./CategoriaDto";

export default interface ArticuloDto extends DataModel<ArticuloDto> {
    id: number;
    eliminado: boolean;
    denominacion: string;
    precioVenta: number;
    imagen: Imagenes;
    unidadMedida: IUnidadMedida;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    categoria: CategoriaDto;
    tiempoEstimadoMinutos: number;
  }