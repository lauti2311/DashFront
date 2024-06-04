import IImagenes from "./Imagenes";
import Sucursal from "./Sucursal";

interface IEmpresa extends DataModel<IEmpresa> {
    id: number;
    eliminado: boolean;
    cuil: number;
    nombre: string;
    razonSocial: string;
    imagen: IImagenes;
    sucursales: Sucursal;
}

export default IEmpresa;