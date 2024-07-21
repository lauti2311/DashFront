import ArticuloInsumoShortDto from "./dto/ArticuloInsumoShortDto";
import DataModel from "./DataModel";

interface IArticuloManufacturadoDetalle extends  DataModel<IArticuloManufacturadoDetalle> {
    cantidad: number;
    articuloInsumo: ArticuloInsumoShortDto
}

export default IArticuloManufacturadoDetalle;