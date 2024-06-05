import Domicilio from "./Domicilio";
import IEmpresa from "./Empresa";
import IImagenes from "./Imagenes";

interface ISucursal extends DataModel<ISucursal> {
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    esCasaMatriz: boolean;
    imagen: IImagenes;
    domicilio: Domicilio;
    empresa: IEmpresa;
}

export default ISucursal;