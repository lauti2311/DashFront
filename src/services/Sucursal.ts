import Sucursal from "../types/Sucursal";
import ISucursal from "../types/Sucursal";
import  BackendClient  from "./BackendClient";

export default class SucursalService extends BackendClient<ISucursal> {
    public async sucursalEmpresa(url: string, idEmpresa: number, token: string): Promise<Sucursal[]> {
        try {
          const path = `${url}sucursales/empresas/${idEmpresa}`;
          const response = await fetch(path, { method: "GET" ,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },});      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          const data = await response.json();
          return data as Sucursal[];
        } catch (error) {
          console.error("Error al obtener los pedidos del cliente:", error);
          throw error;
        }
      }
}