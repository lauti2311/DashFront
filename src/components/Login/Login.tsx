/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthClient from "../../services/Login";
import { useAuth } from "./AuthContext";
import { LoginResponse } from "../../types/dto/LoginResponseDTO";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [clave, setClave] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const authClient = new AuthClient();

    try {
      const response: LoginResponse = await authClient.loginEmpleado({ email, clave });
      console.log("Login response:", response); // Log para depuración

      if (response.jwt) {
        login(response.jwt); // Llamar al método de login del contexto
        // Redirigir al usuario según el rol
        const decodedToken: any = jwtDecode(response.jwt);
        const userRole = decodedToken.tipoEmpleado;
        if (userRole === "ADMIN") {
          window.location.href = "/empresas";
        } else {
          window.location.href = "/empresas";
        }
      } else {
        setError(response.error || "Error desconocido");
      }
    } catch (err) {
      console.error("Error en handleLogin:", err);
      setError("Error al comunicarse con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="clave">Contraseña:</label>
          <input
            type="password"
            id="clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;