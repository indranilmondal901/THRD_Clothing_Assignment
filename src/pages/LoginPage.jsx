import React, { useState } from "react";
import "../style/LoginPage.css";
import Papa from "papaparse";
import usersCSV from "../data/users.csv";

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    Papa.parse(usersCSV, {
      header: true,
      download: true,
      complete: (result) => {
        const users = result.data;
        const user = users.find(
          (u) => u.Username === username && u.Password === password
        );
        if (user) {
          onLoginSuccess(user);
        } else {
          setError("Invalid username or password");
        }
      },
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;