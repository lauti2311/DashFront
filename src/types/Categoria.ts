import DataModel from "./DataModel";

interface ICategoria extends DataModel<ICategoria>{
    denominacion: string,
    articulos: [],
    subCategorias: ICategoria[],
    insumo: boolean
}

export default ICategoria;