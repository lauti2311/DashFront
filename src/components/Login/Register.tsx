/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthClient from "../../services/Login"; // Cambiamos el nombre del import a 'AuthClient' ya que es donde definiste el método registerEmpleado
import { Rol } from "../../types/enums/Rol"; // Asegúrate de que el path sea correcto
import "./Login.css"; // Usamos el mismo archivo de estilos

interface RegisterData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  clave: string;
  fechaNacimiento: string;
  tipoEmpleado: Rol;

}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    clave: "",
    fechaNacimiento: "",
    tipoEmpleado: Rol.EMPLEADO, // Valor por defecto

  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const authClient = new AuthClient();

    try {
      const response = await authClient.registerEmpleado(formData);
      console.log("Register response:", response); 
      if (response.jwt) { 
        window.location.href = "/login"; 
      } else {
        setError(response.error || "Error desconocido al registrarse");
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-stripe top-stripe"></div>
      <div className="login-box">
        <h1 className="welcome-text">¡Regístrate!</h1>
        <p className="welcome-subtext">Por favor, completa el formulario para registrarte</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="clave">Contraseña:</label>
            <input
              type="password"
              id="clave"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipoEmpleado">Rol:</label>
            <select 
              id="tipoEmpleado" 
              name="tipoEmpleado" 
              value={formData.tipoEmpleado} 
              onChange={handleChange}
              required
              className="form-control"
            >
              {Object.values(Rol).map((rol) => (
                <option key={rol} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="sucursal_id">Sucursal ID:</label>
            <input
              type="number"
              id="sucursal_id"
              name="sucursal_id"
              value={formData.sucursal_id}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div> */}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;