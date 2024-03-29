// Navbar.tsx

import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React, { useState } from "react";

interface NavbarProps {
  // Add any props if needed
  path: string;
}

const Navbar: React.FC<NavbarProps> = ({ path }: NavbarProps) => {
  const { isLoggedIn, user, webToken, logout } = useAuth();
  const [activeNavItem, setActiveNavItem] = useState<string>(path);
  const navigate = useNavigate();

  const handleNavItemClick = (itemName: string) => {
    setActiveNavItem(itemName);
    navigate("/" + itemName);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="nav-list">
          <li
            className={`nav-item ${activeNavItem === "home" ? "active" : ""}`}
            onClick={() => handleNavItemClick("home")}
          >
            Home
          </li>
          {isLoggedIn && (
            <li
              className={`nav-item ${
                activeNavItem === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("dashboard")}
            >
              Dashboard
            </li>
          )}
          {isLoggedIn && (
            <li
              className={`nav-item ${
                activeNavItem === "planner" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("planner")}
            >
              Help me Plan!
            </li>
          )}

          {(isLoggedIn && user) ? (
            <li
              style={{
                marginLeft: "auto",
                display: "flex",
                color: "#fff",
              }}
            >
              <li className={`nav-item`}>Welcome back, {user.first_name}</li>
              <li className={`nav-item`} onClick={() => logout()}>
                Logout
              </li>
            </li>
          ) : (
            <li style={{ marginLeft: "auto", display: "flex" }}>
              <li
                className={`nav-item ${
                  activeNavItem === "login" ? "active" : ""
                }`}
                onClick={() => handleNavItemClick("login")}
              >
                Login
              </li>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
