
import Usuario from "../types/Usuario";
import BackendClient from "./BackendClient";

export default class UsuarioService extends BackendClient<Usuario> {
    public async getByEmail(path: string): Promise<Usuario | undefined> {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        } catch (error) {
            return undefined
        }
    }
}