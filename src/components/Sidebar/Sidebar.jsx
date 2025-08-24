import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    logout();
  };

  // Adiciona a classe 'open' condicionalmente
  const sidebarClassName = isOpen ? "sidebar open" : "sidebar";

  return (
    <aside className={sidebarClassName}>
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <button onClick={handleLogout} className="sidebar-link">
            <FiLogOut />
            <span>Sair (Logout)</span>
          </button>
        </li>
        {/* Futuras opções do menu virão aqui */}
      </ul>
    </aside>
  );
};

export default Sidebar;
