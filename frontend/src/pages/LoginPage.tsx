// LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { doLogin } from "../api/doLogin";
import { Box, Button } from "@mui/material";

const LoginPage = () => {
  const { isLoggedIn, login } = useAuth();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (accountId === "" || password === "") {
      setError("Invalid login details. Please try again.");
      return;
    }

    const loginResponse = await doLogin(accountId, password);

    if (loginResponse === null) {
      setError("Login failed... Please try again");
    } else {
      login(loginResponse);
      navigate("/home");
    }
  };

  return (
    <>
      <Navbar path="login" />
      {isLoggedIn ? (
        <h2>You are already logged in.</h2>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minHeight="100vh"
          style={{
            marginTop: "20px",
            maxWidth: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <h2>Login Page</h2>
          <div>
            <label htmlFor="accountId" style={{ marginRight: "10px" }}>
              Username:
            </label>
            <input
              type="text"
              id="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ marginRight: "10px" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              style={{ marginTop: "20px" }}
            >
              Login
            </Button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>
      )}
    </>
  );
};

export default LoginPage;
