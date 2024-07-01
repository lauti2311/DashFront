import DataModel from "../DataModel";
import Domicilio from "../Domicilio";


interface SucursalDto extends DataModel<SucursalDto>{
    nombre: string;
    horarioApertura: string;
    horarioCierre: string;
    esCasaMatriz: boolean;
    domicilio: Domicilio;
}

export default SucursalDto;