import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiLogOut,
  FiHome,
  FiList,
  FiSettings,
  FiBriefcase,
  FiCreditCard,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
  { name: "Transações", path: "/transactions", icon: <FiList /> },
  { name: "Categorias", path: "/categories", icon: <FiBriefcase /> },
  { name: "Investimentos", path: "/investments", icon: <FiCreditCard /> },
  { name: "Configurações", path: "/settings", icon: <FiSettings /> },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    onClose();
    logout();
  };

  const sidebarClassName = isOpen ? "sidebar open" : "sidebar";

  return (
    <aside className={sidebarClassName}>
      <div className="sidebar-header">
        <h3>MeOrganiza</h3>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} className="sidebar-link" onClick={onClose}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
        {/* Botão de sair fixo no final do menu */}
        <li className="sidebar-logout">
          <button onClick={handleLogout} className="sidebar-link">
            <FiLogOut />
            <span>Sair</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
