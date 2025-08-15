import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../assets/landing.module.css";
import { Combobox } from "./Combobox";

type ComboboxItem = {
  value: string;
  label: string;
};

// 🔁 Données statiques pour les villes
const staticCities: ComboboxItem[] = [
  { value: "Paris", label: "Paris" },
  { value: "London", label: "London" },
  { value: "Berlin", label: "Berlin" },
  { value: "Madrid", label: "Madrid" },
];

const specialities: ComboboxItem[] = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Generalist", label: "Generalist" },
  { value: "Neurology", label: "Neurology" },
  { value: "Psychiatry", label: "Psychiatry" },
];

export default function Filterexpert() {
  const [city, setCity] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const navigate = useNavigate();

  const submitButtonFunction = () => {
    navigate(
      `/result?city=${encodeURIComponent(city)}&specialite=${encodeURIComponent(speciality)}`,
    );
  };

  const buttonDisable = !city || !speciality;

  return (
    <div style={{ paddingLeft: "70px" }}>
      <div style={{ display: "flex" }}>
        <label className={styles.inputLabel}>
          <Combobox
            items={staticCities}
            selectedValue={city}
            onChange={setCity}
            placeholder="Choose your city"
          />
        </label>

        <label className={styles.inputLabel}>
          <Combobox
            items={specialities}
            selectedValue={speciality}
            onChange={setSpeciality}
            placeholder="Choose your speciality"
          />
        </label>
      </div>

      <button
        onClick={submitButtonFunction}
        disabled={buttonDisable}
        style={{ width: "400px", color: "white", fontSize: "20px" }}
      >
        Search
      </button>
    </div>
  );
}
