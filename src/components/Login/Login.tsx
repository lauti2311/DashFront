/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthClient from "../../services/Login";
import { useAuth } from "./AuthContext";
import { LoginResponse } from "../../types/dto/LoginResponseDTO";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [clave, setClave] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mostrarClave, setMostrarClave] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

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
      setError("Contraseña Incorrecta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-stripe top-stripe"></div>
      <div className="login-box">
        <h1 className="welcome-text">¡Bienvenido!</h1>
        <p className="welcome-subtext">Por favor, inicia sesión para continuar</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-wrapper">
              <input
                type={mostrarClave ? 'text' : 'password'}
                id="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
                className="form-control"
              />
              <button 
                type="button" 
                className="show-password-button" 
                onClick={() => setMostrarClave(!mostrarClave)}
                aria-label={mostrarClave ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarClave ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <button onClick={handleRegisterClick} className="register-button">Registrar</button>
      </div>
    </div>
  );
};

export default Login;