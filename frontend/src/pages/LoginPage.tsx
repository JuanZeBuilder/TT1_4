// LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { doLogin } from "../api/doLogin";

const LoginPage = () => {
  const { isLoggedIn, login } = useAuth();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        <>
          <h2>Login Page</h2>
          <div>
            <label htmlFor="accountId">Account ID:</label>
            <input
              type="text"
              id="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </>
  );
};

export default LoginPage;
