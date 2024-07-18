import Categoria from "./Categoria";
import DataModel from "./DataModel";
import SucursalDto from "./dto/SucursalDto";
import Imagenes from "./Imagenes";
import UnidadMedida from "./UnidadMedida";

interface IArticuloInsumo extends DataModel<IArticuloInsumo> {
    denominacion: string;
    precioVenta: number;
    imagenes: Imagenes [];
    unidadMedida: UnidadMedida;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    esParaElaborar: boolean;
    categoria: Categoria;
    sucursal: SucursalDto;
  
  }

export default IArticuloInsumo;