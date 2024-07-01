import DataModel from "./DataModel";
import Imagenes from "./Imagenes";
import PromocionDetalle from "./PromocionDetalle";
import SucursalDto from "./dto/SucursalDto";
import { TipoPromocion } from "./enums/TipoPromocion";

interface Promocion extends DataModel<Promocion>{
  denominacion: string,
  fechaDesde: string,
  fechaHasta: string,
  horaDesde: string,
  horaHasta: string,
  descripcionDescuento: string,
  precioPromocional: number,
  tipoPromocion: TipoPromocion,
  imagenes: Imagenes[],
  sucursales: SucursalDto[],
  promocionDetalle: PromocionDetalle[]
  }

  export default Promocion;