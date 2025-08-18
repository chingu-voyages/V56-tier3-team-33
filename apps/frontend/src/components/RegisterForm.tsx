import { useState } from "react";
import { Link } from "react-router-dom";
import * as validator from "../lib/validator";
import * as userService from "../services/user";
import { useAuth } from "../contexts/AuthContext";

import { Combobox } from "./Combobox";
import { Button } from "./userInterface/button";
import { Input } from "./userInterface/input";
import { Label } from "./userInterface/label";
import { cn } from "../lib/utils";

import styles from "../assets/loginPage.module.css";

import specialties from "../data/specialties.json";
import cities from "../data/cities.json";
import languages from "../data/languages.json";

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

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const authContext = useAuth();

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

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
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
    <form
      onSubmit={handleRegister}
      className={cn(styles.form, className)}
      {...props}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Ready to join?</h1>
        {/* <p className={styles.subtitle}>Enter your credentials below</p> */}
      </div>

      {step === 1 && (
        <>
          <AccountDetails
            email={form.email}
            password={form.password}
            confirmPassword={form.confirmPassword}
            handleChange={handleChange}
          />

          <Button
            type="button"
            style={{ backgroundColor: "#8db5d9" }}
            onClick={handleNextStep}
          >
            Next
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <BasicDetails
            name={form.name}
            age={form.age}
            gender={form.gender}
            handleChange={handleChange}
          />
          <Button
            type="button"
            style={{ backgroundColor: "#8db5d9" }}
            onClick={handleNextStep}
          >
            Next
          </Button>
          <Button
            type="button"
            style={{ backgroundColor: "#8db5d9" }}
            onClick={handlePrevStep}
          >
            Go back
          </Button>
        </>
      )}

      {step == 3 && (
        <>
          <JobDetails
            specialty={form.specialty}
            city={form.city}
            phone={form.phone}
            language={form.language}
            handleChange={handleChange}
          />

          <Button
            type="submit"
            style={{ backgroundColor: "#8db5d9" }}
            disabled={isLoading}
          >
            Join us
          </Button>
          <Button
            type="button"
            style={{ backgroundColor: "#8db5d9" }}
            onClick={handlePrevStep}
          >
            Go back
          </Button>
        </>
      )}

      <div className={styles.footer}>
        Already have an account?{" "}
        <Link className={styles.signupLink} to="/signup">
          Login
        </Link>
      </div>

      {errors.length > 0 && (
        <div className={styles.errorMessages}>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* {error && <p>{error}</p>} */}
    </form>
  );
}

function AccountDetails({
  email,
  password,
  confirmPassword,
  handleChange,
}: WithChangeHandler<AccountFormValues>) {
  return (
    <>
      <div className={styles.fieldGroup}>
        <Label>
          Email
          <Input
            name="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={handleChange}
            required
          />
        </Label>
      </div>
      <div className={styles.fieldGroup}>
        <Label>
          Password
          <Input
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Label>
      </div>
      <div className={styles.fieldGroup}>
        <Label>
          Password Confirmation
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </Label>
      </div>
    </>
  );
}

function BasicDetails({
  name,
  age,
  gender,
  handleChange,
}: WithChangeHandler<BasicFormValues>) {
  return (
    <>
      <div className={styles.radioButton}>
        <Label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={gender === "M"}
            className={styles.inputGreen}
            onChange={handleChange}
          />
          Male
        </Label>
        <Label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={gender === "F"}
            className={styles.inputGreen}
            onChange={handleChange}
          />
          Female
        </Label>
      </div>

      <div className={styles.fieldGroup}>
        <Label>
          Full Name:
          <Input
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={handleChange}
            required
          />
        </Label>
      </div>

      <div className={styles.fieldGroup}>
        <Label>
          Age:
          <Input
            name="age"
            type="number"
            min="18"
            placeholder="18+"
            value={age}
            onChange={handleChange}
            required
          />
        </Label>
      </div>
    </>
  );
}

const specialtyItems = specialties.map((specialty) => ({
  value: specialty,
  label: specialty,
}));
const cityItems = cities.map(({ city }) => ({ value: city, label: city }));
const languageItems = Object.entries(languages).map(([code, name]) => ({
  value: code,
  label: name,
}));

function JobDetails({
  specialty,
  city,
  phone,
  language,
  handleChange,
}: WithChangeHandler<JobFormValues>) {
  return (
    <>
      <div className={styles.fieldGroup}>
        <Label>
          Specialty:
          <Combobox
            items={specialtyItems}
            selectedValue={specialty}
            onChange={(v) =>
              handleChange({
                target: { name: "specialty", value: v },
              } as ChangeEvent<HTMLSelectElement>)
            }
            placeholder="Choose your specialty"
          />
        </Label>
      </div>

      <div className={styles.fieldGroup}>
        <Label>
          City:
          <Combobox
            items={cityItems}
            selectedValue={city}
            onChange={(v) =>
              handleChange({
                target: { name: "city", value: v },
              } as ChangeEvent<HTMLSelectElement>)
            }
            placeholder="Choose your city"
          />
        </Label>
      </div>

      <div className={styles.fieldGroup}>
        <Label>
          Language:
          <Combobox
            items={languageItems}
            selectedValue={language}
            onChange={(v) =>
              handleChange({
                target: { name: "language", value: v },
              } as ChangeEvent<HTMLSelectElement>)
            }
            placeholder="Choose your language"
          />
        </Label>
      </div>

      <div className={styles.fieldGroup}>
        <Label>
          Phone number:
          <Input
            name="phone"
            type="tel"
            placeholder="+1 555-123-4567"
            value={phone}
            onChange={handleChange}
            required
          />
        </Label>
      </div>
    </>
  );
}
