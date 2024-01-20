// Navbar.tsx

import './Navbar.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  // Add any props if needed
}

const Navbar: React.FC<NavbarProps> = () => {
  const [activeNavItem, setActiveNavItem] = useState<string>("home");
  const navigate = useNavigate();

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
    navigate(itemName);
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li
          className={`nav-item ${activeNavItem === "home" ? "active" : ""}`}
          onClick={() => handleNavItemClick("home")}
        >
          Home
        </li>
        <li
          className={`nav-item ${activeNavItem === "about" ? "active" : ""}`}
          onClick={() => handleNavItemClick("about")}
        >
          About
        </li>
        <li
          className={`nav-item ${activeNavItem === "services" ? "active" : ""}`}
          onClick={() => handleNavItemClick("services")}
        >
          Services
        </li>
        <li
          className={`nav-item ${activeNavItem === "contact" ? "active" : ""}`}
          onClick={() => handleNavItemClick("contact")}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
