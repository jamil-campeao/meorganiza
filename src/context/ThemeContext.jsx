import React, { createContext, useState, useEffect, useContext } from "react";

// 1. Criar o Contexto
const ThemeContext = createContext();

// 2. Criar o Provedor (Componente que vai envolver a aplicação)
export const ThemeProvider = ({ children }) => {
  // Estado para guardar o tema atual. Inicia com 'light' ou o que estiver salvo no localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // Efeito para aplicar o tema no body e salvar a preferência
  useEffect(() => {
    // Adiciona o atributo data-theme na tag <body>
    document.body.setAttribute("data-theme", theme);
    // Salva a escolha do usuário no localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Função para trocar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Criar um Hook customizado para facilitar o uso do contexto
export const useTheme = () => {
  return useContext(ThemeContext);
};
