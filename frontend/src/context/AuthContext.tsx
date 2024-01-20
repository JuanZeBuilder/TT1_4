import React, { createContext, useContext, useState } from "react";
import { User } from "../model/User";
import { LoginResponse } from "../api/doLogin";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (loginRes: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
    // Check if there is an authentication state in localStorage
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });
  const [user, setUser] = useState<User | null>(() => {
    // Check if there is an authentication state in localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });
  const [webToken, setWebToken] = useState(() => {
    // Check if there is an authentication state in localStorage
    const storedWebToken = localStorage.getItem("webToken");
    return storedWebToken ? (JSON.parse(storedWebToken) as string) : "";
  });

  const login = (loginRes: LoginResponse) => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    setUser(loginRes.user[0]);
    localStorage.setItem("user", JSON.stringify(loginRes.user[0]));
    setWebToken(loginRes.jwt_token);
    localStorage.setItem("webToken", JSON.stringify(loginRes.jwt_token));
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    alert("You have logged out successfully");
    window.location.href = "/home";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
