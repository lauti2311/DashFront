// Importamos el tipo de dato IPromocion y la clase BackendClient
import Promocion from "../types/Promocion";
import  BackendClient  from "./BackendClient";

// Clase PromocionService que extiende BackendClient para interactuar con la API de personas
export default class PromocionService extends BackendClient<Promocion> {
    public async promocionesSucursal(url: string, idSucursal: number): Promise<Promocion[]> {
        try {
          const path = `${url}promociones/sucursal/${idSucursal}`;
          const response = await fetch(path, { method: "GET" ,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },});      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          const data = await response.json();
          return data as Promocion[];
        } catch (error) {
          console.error("Error al obtener los pedidos del cliente:", error);
          throw error;
        }
      }
      
}