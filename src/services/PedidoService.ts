/* eslint-disable @typescript-eslint/no-explicit-any */
import Pedido from "../types/Pedido";
import { Estado } from "../types/enums/Estado";
import BackendClient from "./BackendClient";

export default class PedidoService extends BackendClient<Pedido> {

  async cambiarEstado(url: string, pedidoId: string, nuevoEstado: Estado, ): Promise<Pedido> {
    const path = `${url}/${pedidoId}/estado?nuevoEstado=${nuevoEstado}`;
    console.log(path)
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

      },
    };
    return this.request(path, options);
  }

  async getPedidosFiltrados(url: string ): Promise<Pedido[]> {
    const path = `${url}/filtrado`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

      },
    };
    console.log(`GET Request to: ${path}`);
    return this.requestAll(path, options);
  }

  public async pedidosSucursal(url: string, idSucursal: number, ): Promise<Pedido[]> {
    try {
      const path = `${url}pedido/sucursal/${idSucursal}`;
      const response = await fetch(path, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")

          
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      return data as Pedido[];
    } catch (error) {
      console.error("Error al obtener los pedidos del cliente:", error);
      throw error;
    }
  }

  async getRankingInsumos(url: string, sucursalId: string | undefined, ): Promise<any[][]> {
    const path = `${url}pedido/ranking/insumos/data/${sucursalId}`;
    console.log(path)
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

      },
    };
    return (this.request(path, options) as unknown) as any[][];
  }

  async getPedidosPorCliente(url: string, sucursalId: string | undefined, ): Promise<any[][]> {
    const path = `${url}pedido/ranking/pedidos/cliente/data/${sucursalId}`;
    console.log(path)
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

        
      },
    };
    return (this.request(path, options) as unknown) as any[][];
  }

  async getIngresos(url: string, sucursalId: string | undefined, ): Promise<any[][]> {
    const path = `${url}pedido/ranking/ingresos/data/${sucursalId}`;
    console.log(path)
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

        
      },
    };
    return (this.request(path, options) as unknown) as any[][];
  }

  async getGanancias(url: string, sucursalId: string | undefined, ): Promise<any[][]> {
    const path = `${url}pedido/ranking/ganancias/data/${sucursalId}`;
    console.log(path)
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")

        
      },
    };
    return (this.request(path, options) as unknown) as any[][];
  }

  async crearFactura(url: string, pedidoId: string, ): Promise<any> {
    const path = `${url}facturas/crear/${pedidoId}`;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        
        
      },
    };
    return this.request(path, options);
  }

  async enviarFactura(url: string, pedidoId: string, userEmail: string, ): Promise<void> {
    try {
      const formData = new URLSearchParams();
      formData.append('to', userEmail);
  
      const response = await fetch(`${url}mail/enviarFactura/${pedidoId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded", // Cambiar Content-Type
          
        },
        body: formData, // Enviar formData en lugar de JSON.stringify
      });
  
      if (!response.ok) {
        throw new Error(`Error al enviar la factura: ${response.status}`);
      }
  
      console.log("Factura enviada por correo electrónico");
    } catch (error) {
      console.error("Error al enviar la factura por correo:", error);
      throw error;
    }
  }
}
