import DataModel from "./DataModel";


interface IUsuario extends DataModel<IUsuario>{
    id: number;
    auth0Id: string;
    username: string;
}

export default IUsuario;