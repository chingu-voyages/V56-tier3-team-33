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
  number: string;
  medical: string;
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
    number: "",
    medical: "",
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
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
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
                      className={styles.inputGreen}
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
                      className={styles.inputGreen}
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
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Are you a medical professional?
                  <div className={styles.radioChoice}>
                    <label style={{ marginRight: "35px" }}>
                      <input
                        type="radio"
                        name="medical"
                        value="yes"
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="medical"
                        value="no"
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>
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
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="text"
                  name="language"
                  placeholder="Language"
                  value={form.language}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="text"
                  name="speciality"
                  placeholder="Speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={form.number}
                  onChange={handleChange}
                  style={{ border: "1px solid #639F2F" }}
                  required
                />
              </>
            )}

            <div style={{ marginTop: "1rem" }}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  style={{ marginRight: "1rem" }}
                >
                  Previous
                </button>
              )}
              {step === 1 && (
                <button type="button" onClick={handleNextStep}>
                  next
                </button>
              )}
              {step === 2 && (
                <>
                  {form.medical === "yes" && (
                    <button type="button" onClick={handleNextStep}>
                      next
                    </button>
                  )}
                  {form.medical === "no" && (
                    <button type="submit">join us</button>
                  )}
                  {!form.medical && (
                    <p style={{ color: "red" }}>Please select Yes or No</p>
                  )}
                </>
              )}

              {step === 3 && <button type="submit">join us</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
