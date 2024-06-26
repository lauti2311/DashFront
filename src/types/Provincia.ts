import Pais from "./Pais";
import DataModel from "./DataModel";

interface IProvincia extends DataModel<IProvincia> {
    id: number;
    eliminado: boolean;
    nombre: string;
    pais: Pais;

}

export default IProvincia;