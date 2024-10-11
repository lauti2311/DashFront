import DataModel from "./DataModel";
import Domicilio from "./Domicilio";
import IEmpresa from "./Empresa";
import Imagenes from "./Imagenes";

interface ISucursal extends DataModel<ISucursal> {
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    esCasaMatriz: boolean;
    imagenes: Imagenes[];
    domicilio: Domicilio;
    empresa: IEmpresa;
}

export default ISucursal;