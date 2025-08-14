import type React from "react";
import { useState } from "react";
import styles from "../assets/login.module.css";
import { useNavigate } from "react-router-dom";

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // const handleLogin = async (e:React.Event) => {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/api/v1/user/login`, {
        // Our backend Url
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Login successful", data);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
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
            &times;
          </button>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputGreen}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputGreen}
            />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </form>

          {error && <p className={styles.errorHandle}>{error}</p>}

          <p>
            Don't have an account?
            <span onClick={() => navigate("/signup")}> Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
