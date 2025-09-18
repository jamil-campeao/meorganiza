import React from "react";
import { FiMenu } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="navbar">
      <button className="menu-button" onClick={onMenuClick}>
        <FiMenu />
      </button>
      <div className="navbar-title">MeOrganiza Dashboard</div>
    </nav>
  );
};

export default Navbar;
