import DataModel from "./DataModel";
import Imagenes from "./Imagenes";
import PromocionDetalle from "./PromocionDetalle";
import SucursalShorDto from "./dto/SucursalShortDto";
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
  sucursales: SucursalShorDto[],
  promocionDetalle: PromocionDetalle[]
  }

  export default Promocion;