import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Inicia o estado lendo o token do localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Função para fazer login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // Atualiza o estado
    navigate("/dashboard"); // Navega após atualizar o estado
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); // Atualiza o estado
    navigate("/login"); // Navega para o login
  };

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para usar o contexto facilmente
export const useAuth = () => {
  return useContext(AuthContext);
};
