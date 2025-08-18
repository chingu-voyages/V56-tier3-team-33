import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as userService from "../services/user";
import { useAuth } from "../contexts/AuthContext";

import { Button } from "./userInterface/button";
import { Input } from "./userInterface/input";
import { Label } from "./userInterface/label";
import { cn } from "../lib/utils";
import styles from "../assets/loginPage.module.css";

import type { ComponentProps, FormEvent } from "react";

export function LoginForm({ className, ...props }: ComponentProps<"form">) {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setLoading(true);

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
          authContext.login(data.token);

          setEmail("");
          setPassword("");
          navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className={cn(styles.form, className)}
      {...props}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Login to your account</h1>
        {/* <p className={styles.subtitle}>Enter your credentials below</p> */}
      </div>
      <div className={styles.fieldGroup}>
        <Label>
          Email
          <Input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Label>
      </div>
      <div className={styles.fieldGroup}>
        <Label>
          Password
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Label>
      </div>

      <Button
        type="submit"
        style={{ backgroundColor: "#8db5d9" }}
        disabled={isLoading}
      >
        Login
      </Button>
      <div className={styles.footer}>
        Don&apos;t have an account?{" "}
        <Link className={styles.signupLink} to="/signup">
          Sign Up
        </Link>
      </div>

      {error && (
        <div style={{ color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}
