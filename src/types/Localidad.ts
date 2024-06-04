import Provincia from "./Provincia";

interface ILocalidad extends DataModel<ILocalidad> {
    id: number;
    eliminado: boolean;
    nombre: string;
    provincia: Provincia;

}

export default ILocalidad;