import DataModel from "./DataModel";
import IImagenes from "./Imagenes";

interface IEmpresa extends DataModel<IEmpresa> {
    id: number;
    eliminado: boolean;
    cuil: number;
    nombre: string;
    razonSocial: string;
    imagenes: IImagenes[];
}

export default IEmpresa;