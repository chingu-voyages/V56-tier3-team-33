import React, { useState } from "react";
import styles from "../assets/login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // 🔹 States pour les champs de formulaire
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fonction pour envoyer la requête à ton backend
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        // Our backend Url
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful", data);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <div className={styles.modaloverlay}>
        <div
          className={styles.modalcontent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Login</h2>
          <button className={styles.closeBtn1} onClick={() => navigate("/")}>
            X
          </button>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Submit</button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p>
            Have you an account?
            <span onClick={() => navigate("/signup")}> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
