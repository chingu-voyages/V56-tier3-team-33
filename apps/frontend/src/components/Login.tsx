import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../services/user";

import styles from "../assets/login.module.css";
import type React from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const data = await userService.login({ email, password });

      switch (data.type) {
        case "unknown_error":
          console.error(data.error, data.status);
          setError(data.error);
          break;
        case "validation_error":
          setError(data.errors.map(({ message }) => message).join("\n"));
          break;
        case "error":
          setError(data.error);
          break;
        case "success":
          setEmail("");
          setPassword("");
          navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

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
