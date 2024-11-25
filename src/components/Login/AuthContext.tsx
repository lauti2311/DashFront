/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.tipoEmpleado;
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    window.location.href = "/empresas";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};