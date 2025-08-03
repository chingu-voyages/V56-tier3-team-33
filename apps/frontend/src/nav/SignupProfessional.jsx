import React, { useState } from "react";
import styles from "./login.module.css";
export default function Signupclient({ onClose, setMode, previous }) {
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm((item) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    console.log("Submitting:", form);
    // we can send the formData to the backend
    //We can show a message to explain the fact that we have
  };

  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={styles.modalcontent}>
          <button className={styles.closeTag} onClick={onClose}>
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
                  type="text"
                  name="password"
                  placeholder="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </label>
              <label>
                <input
                  type="text"
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
              <button type="submit">Submit</button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}
