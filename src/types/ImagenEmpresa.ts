import DataModel from "./DataModel";

interface IImagenEmpresa extends DataModel<IImagenEmpresa> {
    id: number,
    eliminado: boolean;
    url: string;
    name: string;
    idEmpresa: number;
}

export default IImagenEmpresa;