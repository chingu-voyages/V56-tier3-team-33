import type { ChangeEvent, FormEvent } from "react";
import styles from "../assets/login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  age: string;
  gender: string;
  city: string;
};

export default function Signupclient() {
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    city: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Submitting:", form);
    // send form data to backend or show a success message
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={styles.modalcontent}>
          <button
            className={`${styles.closeTag} ${styles.closeBtn2}`}
            onClick={() => navigate("/")}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <>
              <label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="age"
                  placeholder="age"
                  value={form.age}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="gender"
                  placeholder="gender"
                  value={form.gender}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
                  name="city"
                  placeholder="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </label>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="submit">Submit</button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
