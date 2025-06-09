import React, { useState } from "react";
import { users } from "../constants/users";

const Login = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (user) {
      handleLogin(user);
      setCredentials({ username: "", password: "" });
    } else {
      setErr("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      {err && <p className="error-message">{err}</p>}
    </div>
  );
};

export default Login;
