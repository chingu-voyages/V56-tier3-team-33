import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "../assets/login.module.css";
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
  language: string;
  speciality: string;
  qualification: string;
  number: string;
};

export default function SignupProfessional() {
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    city: "",
    language: "",
    speciality: "",
    qualification: "",
    number: "",
  });

  const navigate = useNavigate();

  const handleNextStep = () => {
    if (step === 1 && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting:", form);
    // Envoi des données au backend ou autre logique
  };

  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={styles.modalcontent}>
          <button className={styles.closeTag} onClick={() => navigate("/")}>
            X
          </button>
          <form
            onSubmit={handleSubmit}
            className={`${styles.formContent} ${
              step === 1
                ? styles.firstStep
                : step === 2
                  ? styles.secondStep
                  : step === 3
                    ? styles.thirdStep
                    : ""
            }`}
          >
            {step === 1 && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.radioButton}>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === "male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                  <label style={{ marginLeft: "1rem" }}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === "female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={form.number}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="language"
                  placeholder="Language"
                  value={form.language}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="speciality"
                  placeholder="Speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="qualification"
                  placeholder="Qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <div style={{ marginTop: "1rem" }}>
              {step > 1 && (
                <button type="button" onClick={handlePrevStep}>
                  Previous
                </button>
              )}

              {step < 3 ? (
                <button type="button" onClick={handleNextStep}>
                  Next
                </button>
              ) : (
                <button type="submit">join us</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
