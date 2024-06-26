import DataModel from "../DataModel";


interface CategoriaDto extends DataModel<CategoriaDto>{
    id: number;
    eliminado: false,
    denominacion: string,
    esInsumo: false,
}
export default CategoriaDto;