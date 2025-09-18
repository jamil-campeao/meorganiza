import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Importe o hook
import "./ThemeToggleButton.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      Mudar para Modo {theme === "light" ? "Escuro" : "Claro"}
    </button>
  );
};

export default ThemeToggleButton;
