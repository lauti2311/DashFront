import IArticuloManufacturado from "../types/ArticuloManufacturado";
import BackendClient from "./BackendClient";

export default class ArticuloManufacturadoService extends BackendClient<IArticuloManufacturado> {
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

            // Manejo de respuestas vacías
            const text = await response.text();
            if (!text) {
                console.error("Respuesta vacía del servidor");
                return [];
            }

            const data = JSON.parse(text);
            return data as IArticuloManufacturado[];
        } catch (error) {
            console.error("Error al obtener los pedidos del cliente:", error);
            throw error;
        }
    }
}
