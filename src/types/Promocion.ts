import ArticuloInsumo from "./ArticuloInsumo";
import Imagenes from "./Imagenes";

interface IPromocion extends DataModel<IPromocion>{
    denominacion: string;
    fechaDesde: string;
    fechaHasta: string;
    horaDesde: string;
    horaHasta: string;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: string;
    articulos: ArticuloInsumo[];
    imagenes: Imagenes[];
  }

  export default IPromocion;