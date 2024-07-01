import DataModel from "../DataModel";


interface CategoriaDto extends DataModel<CategoriaDto>{
    denominacion: string,
    esInsumo: false,
}

export default CategoriaDto;