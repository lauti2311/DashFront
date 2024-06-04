import Localidad from "./Localidad";

interface IDomicilio extends DataModel<IDomicilio> {
    id: number;
    eliminado: boolean;
    calle: string;
    numero: BigInteger;
    cp: number;
    piso: number;
    nroDpto: number;
    localidad: Localidad;

}

export default IDomicilio;