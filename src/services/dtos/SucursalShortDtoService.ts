import SucursalShorDto from "../../types/dto/SucursalShortDto";
import BackendClient from "../BackendClient";


export default class SucursalShortDtoService extends BackendClient<SucursalShorDto> {
    public async sucursalEmpresa(url: string, idEmpresa: number ): Promise<SucursalShorDto[]> {
        try {
          const path = `${url}sucursales/empresas/${idEmpresa}`;
          const response = await fetch(path, { method: "GET" ,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },});      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          const data = await response.json();
          return data as SucursalShorDto[];
        } catch (error) {
          console.error("Error al obtener los pedidos del cliente:", error);
          throw error;
        }
      }
}