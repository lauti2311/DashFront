/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import AuthClient from "../../services/Login"; // Cambiamos el nombre del import a 'AuthClient' ya que es donde definiste el método registerEmpleado
import { Rol } from "../../types/enums/Rol"; // Asegúrate de que el path sea correcto
import "./Login.css"; // Usamos el mismo archivo de estilos
import { Empleado } from "../../types/Empleado";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<Empleado>({
    id: 0, // or any default value
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    clave: "",
    fechaNacimiento: new Date(),
    tipoEmpleado: Rol.EMPLEADO, // Valor por defecto
    eliminado: false // or any default value
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (!validatePassword(formData.clave)) {
      setError("La contraseña debe tener más de 6 caracteres, al menos una mayúscula y un número.");
      setIsLoading(false);
      return;
    }

    const authClient = new AuthClient();

    try {
      const response = await authClient.registerEmpleado(formData);
      console.log("Register response:", response); 
      if (response.error) { 
        setError(response.error || "Error desconocido al registrarse");
      } else {
        navigate("/"); 
      }
    } catch (err) {
      console.error("Error en handleSubmit:", err);
      setError("La contraseña debe tener más de 6 caracteres, al menos una mayúscula y un número.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
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
              <small className="form-text text-muted">
              La contraseña debe tener más de 6 caracteres, al menos una mayúscula y un número.
            </small>
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
          <button type="button" className="back-button" onClick={handleBackClick}>
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;