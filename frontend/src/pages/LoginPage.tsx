// LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";

const LoginPage = () => {
  const backendURL = "http://localhost:5000/";
  const { isLoggedIn, login } = useAuth();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    login();
    navigate("/home");

    // try {
    //   const response = await fetch(backendURL + "users/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ACCOUNT_ID: accountId, PASSWORD: password }),
    //   });

    //   if (response.ok) {
    //     // Authentication successful, handle the success (e.g., store tokens or redirect)
    //     const data = await response.json();
    //     console.log(data["code"]);
    //     if (data["code"] === 200) {
    //       login();
    //       navigate("/home");
    //     } else {
    //       setError("Invalid username or password");
    //     }
    //   }
    // } catch (error) {
    //   console.error("Error during login:", error);
    //   setError("An error occurred during login");
    // }
  };

  return (
    <>
      <Navbar path="login" />
      {isLoggedIn ? (
        <h2>You are already logged in.</h2>
      ) : (
        <>
          {" "}
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
