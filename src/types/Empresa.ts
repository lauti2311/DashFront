import IImagenes from "./Imagenes";

interface IEmpresa extends DataModel<IEmpresa> {
    id: number;
    eliminado: boolean;
    cuil: number;
    nombre: string;
    razonSocial: string;
    imagen: IImagenes;
}

export default IEmpresa;