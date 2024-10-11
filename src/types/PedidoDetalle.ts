import DataModel from "./DataModel";
import ArticuloDto from "./dto/ArticuloDto";

export default interface PedidoDetalle extends DataModel<PedidoDetalle> {
  id: number;
  eliminado: boolean;
  cantidad: number;
  subTotal: number;
  articulo: ArticuloDto;
}
