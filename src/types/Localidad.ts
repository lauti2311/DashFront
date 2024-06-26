import Provincia from "./Provincia";
import DataModel from "./DataModel";

interface ILocalidad extends DataModel<ILocalidad> {
    id: number;
    eliminado: boolean;
    nombre: string;
    provincia: Provincia;

}

export default ILocalidad;