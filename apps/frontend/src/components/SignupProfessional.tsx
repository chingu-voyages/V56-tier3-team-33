import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from "../services/user";
import { useAuth } from "../contexts/AuthContext";
import * as validator from "../lib/validator";

import styles from "../assets/login.module.css";
import type { ChangeEvent, FormEvent } from "react";

type WithChangeHandler<T> = T & {
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

type AccountFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type BasicFormValues = {
  name: string;
  age: string;
  gender: string;
};

type JobFormValues = {
  specialty: string;
  city: string;
  phone: string;
  language: string;
};

export type FormValues = AccountFormValues & BasicFormValues & JobFormValues;

const defaultFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  age: "",
  gender: "",
  specialty: "",
  city: "",
  phone: "",
  language: "",
};

export default function SignupProfessional() {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormValues>({ ...defaultFormValues });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleNextStep = () => {
    const errors = validateCurrentStep();
    if (errors.length) {
      setErrors(errors);
      return;
    }

    setErrors([]);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const errors = validateCurrentStep();
    if (errors.length) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    setErrors([]);

    // this is a temporary workaround to avoid time spent
    // on switching to year/month/day controls in the UI
    // and multiselect on languages
    //TODO: natively support this registerDetails format
    const now = new Date();
    const dateOfBirth = new Date(
      now.getFullYear() - Number(form.age),
      now.getMonth(),
      now.getDate(),
    );
    const registerDetails = {
      email: form.email,
      password: form.password,
      name: form.name,
      dateOfBirth: dateOfBirth.toISOString(),
      gender: form.gender,
      specialty: form.specialty,
      city: form.city,
      phone: form.phone,
      languages: [form.language],
    };

    try {
      const data = await userService.register(registerDetails);

      switch (data.type) {
        case "unknown_error":
          console.error(data.error, data.status);
          setErrors([data.error]);
          break;
        case "validation_error":
          setErrors(data.errors.map(({ message }) => message));
          break;
        case "error":
          setErrors([data.error]);
          break;
        case "success":
          authContext.login(data.token);
          setForm({ ...defaultFormValues });
      }
    } catch (err) {
      console.error(err);
      setErrors([(err as Error).message]);
    } finally {
      setLoading(false);
    }
  }

  // TODO: This way of doing it is ugly - refactor this...
  function validateCurrentStep() {
    const errors: string[] = [];

    if (step == 1) {
      if (!validator.isValidEmail(form.email)) {
        errors.push("Email must be a valid address.");
      }
      if (!validator.isValidPassword(form.password)) {
        errors.push(
          "Password must be at least 8 characters of uppercase, lowercase, number, and special characters.",
        );
      }
      if (form.password !== form.confirmPassword) {
        errors.push("Passwords must match.");
      }
    }

    if (step == 2) {
      if (!validator.isValidName(form.name)) {
        errors.push(
          "Name must be between 6 and 50 characters, and at least two words separated by a single space or hyphen.",
        );
      }
      if (!validator.isValidAge(form.age)) {
        errors.push("You must be at least 18 years old.");
      }
      if (!validator.isValidGender(form.gender)) {
        errors.push("Please select a valid gender.");
      }
    }

    if (step == 3) {
      if (!validator.isValidSpecialty(form.specialty)) {
        errors.push("Please enter a valid specialty.");
      }
      if (!validator.isValidCity(form.city)) {
        errors.push("Please enter a valid city.");
      }
      if (!validator.isValidPhone(form.phone)) {
        errors.push("Please enter a valid phone number.");
      }
      if (!validator.isValidLanguage(form.language)) {
        errors.push("Please enter a valid language.");
      }
    }

    return errors;
  }

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <button className={styles.closeTag} onClick={() => navigate("/")}>
          &times;
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
            <AccountDetails
              email={form.email}
              password={form.password}
              confirmPassword={form.confirmPassword}
              handleChange={handleChange}
            />
          )}

          {step === 2 && (
            <BasicDetails
              name={form.name}
              age={form.age}
              gender={form.gender}
              handleChange={handleChange}
            />
          )}

          {step === 3 && (
            <JobDetails
              specialty={form.specialty}
              city={form.city}
              phone={form.phone}
              language={form.language}
              handleChange={handleChange}
            />
          )}

          {errors.length > 0 && (
            <div className={styles.errorMessages}>
              {errors.map((error, index) => (
                <p key={index} style={{ color: "red" }}>
                  {error}
                </p>
              ))}
            </div>
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

            {step === 3 ? (
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Join us"}
              </button>
            ) : (
              <button type="button" onClick={handleNextStep}>
                next
              </button>
            )}
          </div>

          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </form>
      </div>
    </div>
  );
}

// step 1
function AccountDetails({
  email,
  password,
  confirmPassword,
  handleChange,
}: WithChangeHandler<AccountFormValues>) {
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
    </>
  );
}

// step 2
function BasicDetails({
  name,
  age,
  gender,
  handleChange,
}: WithChangeHandler<BasicFormValues>) {
  return (
    <>
      <div className={styles.radioButton}>
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={gender === "M"}
            className={styles.inputGreen}
            onChange={handleChange}
          />
          Male
        </label>
        <label style={{ marginLeft: "1rem" }}>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={gender === "F"}
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
        value={name}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={age}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
    </>
  );
}

// step 3
function JobDetails({
  specialty,
  city,
  phone,
  language,
  handleChange,
}: WithChangeHandler<JobFormValues>) {
  return (
    <>
      <input
        type="text"
        name="city"
        placeholder="City"
        value={city}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
      <input
        type="text"
        name="language"
        placeholder="Language"
        value={language}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
      <input
        type="text"
        name="specialty"
        placeholder="Specialty"
        value={specialty}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={handleChange}
        style={{ border: "1px solid #639F2F" }}
        required
      />
    </>
  );
}
