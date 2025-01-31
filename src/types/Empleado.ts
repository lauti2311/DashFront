import DataModel from "./DataModel";
import { Rol } from "./enums/Rol";

export interface Empleado extends DataModel<Empleado>{
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    fechaNacimiento: Date;
    tipoEmpleado: Rol;
}