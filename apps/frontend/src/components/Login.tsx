import { useState } from "react";
import styles from "../assets/login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
            &times;
          </button>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
