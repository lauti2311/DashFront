import Domicilio from "./Domicilio";

interface ISucursal extends DataModel<ISucursal> {
    id: number;
    eliminado: boolean;
    nombre: string;
    horarioApertura: Date;
    horarioCierre: Date;
    domicilio: Domicilio;

}

export default ISucursal;