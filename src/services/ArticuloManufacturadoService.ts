import IArticuloManufacturado from "../types/ArticuloManufacturado";
import BackendClient from "./BackendClient";

export default class ArticuloManufacturadoService extends BackendClient<IArticuloManufacturado> {
    updateProducto() {
      throw new Error("Method not implemented.");
    }
    public async manufacturados(url: string, idSucursal: number): Promise<IArticuloManufacturado[]> {
        try {
          const path = `${url}articuloManufacturado/sucursal/${idSucursal}`;
          console.log("Request URL:", path);
          const response = await fetch(path, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
      
          if (!response.ok) {
            throw new Error(response.statusText);
          }
      
          const text = await response.text();
          if (!text) {
            console.error("Respuesta vacía del servidor");
            return [];
          }
      
          try {
            return JSON.parse(text) as IArticuloManufacturado[];
          } catch (error) {
            console.error('Error al parsear JSON:', error);
            return [];
          }
        } catch (error) {
          console.error("Error al obtener los productos manufacturados:", error);
          throw error;
        }
      }
      
}
