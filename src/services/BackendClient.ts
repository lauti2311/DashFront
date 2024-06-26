import { AbstractBackendClient } from "./AbstractBackendClient";

export default abstract class BackendClient<T> extends AbstractBackendClient<T> {
  protected async request(path: string, options: RequestInit): Promise<T> {
    try {
      const response = await fetch(path, options);
      const text = await response.text(); // Obtén el texto en lugar de asumir JSON

      console.log('Respuesta del servidor:', text); // Log de la respuesta del servidor

      if (!response.ok) {
        console.log(response.statusText);
        throw new Error(response.statusText);
      }

      return text ? JSON.parse(text) : {}; // Si el texto no está vacío, parsea JSON
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  }

  protected async requestAll(path: string, options: RequestInit): Promise<T[]> {
    try {
      const response = await fetch(path, options);
      const text = await response.text();

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return text ? JSON.parse(text) : [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(url: string, id: string): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "GET",
    };
    return this.request(path, options);
  }

  async getAll(url: string): Promise<T[]> {
    const path = url;
    const options: RequestInit = {
      method: "GET",
    };
    return this.requestAll(path, options);
  }

  async post(url: string, data: T): Promise<T> {
    const path = url;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.request(path, options);
  }

  async put(url: string, id: string, data: T): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this.request(path, options);
  }

  async delete(url: string, id: string): Promise<void> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    
    try {
      await this.request(path, options);
      console.log('Eliminación lógica realizada correctamente.');
    } catch (error) {
      console.error('Error al eliminar:', error);
      throw error;
    }
  }

  async uploadFile(url: string, file: File, id: string): Promise<Response> {
    const path = url;
    const formData = new FormData();
    formData.append('uploads', file);
    formData.append('id', id);

    const options: RequestInit = {
      method: "POST",
      body: formData,
    };

    return fetch(path, options);
  }
}


  // Método para eliminar un elemento por su ID y con auth0 (token)
  // async delete(url:string, id: string, token: string): Promise<void> {
  //   const path = `${url}/${id}`;
  //   const options: RequestInit = {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     },
  //   };
    
  //   try {
  //     await this.request(path, options);
  //     console.log('Eliminación lógica realizada correctamente.');
  //   } catch (error) {
  //     console.error('Error al eliminar:', error);
  //     throw error;
  //   }
  // }


