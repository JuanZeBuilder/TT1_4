import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const backendURL = "http://localhost:8080/";
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Check if passwords match before submitting to the backend
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Your registration logic here
      const response = await fetch(backendURL + "users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, first_name, last_name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data["code"], data["message"]);
        // Registration successful, handle success
        if (data["code"] == 400) {
          setError(data["message"]);
        }
      } else {
        // Registration failed, handle error
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div>
      <h2>Register Now</h2>
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
