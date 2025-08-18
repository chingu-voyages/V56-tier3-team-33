import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../assets/landing.module.css";
import { Combobox } from "./Combobox";
import { Label } from "../components/userInterface/label";

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
      `/experts?city=${encodeURIComponent(city)}&specialty=${encodeURIComponent(speciality)}`,
    );
  };

  const buttonDisable = !city || !speciality;

  return (
    <div style={{ paddingLeft: "70px" }}>
      <div style={{ display: "flex", gap: "15px" }}>
        <Label className={styles.inputLabel}>
          <Combobox
            items={staticCities}
            selectedValue={city}
            onChange={setCity}
            placeholder="Choose your city"
          />
        </Label>

        <Label className={styles.inputLabel}>
          <Combobox
            items={specialities}
            selectedValue={speciality}
            onChange={setSpeciality}
            placeholder="Choose your speciality"
          />
        </Label>
      </div>

      <button
        onClick={submitButtonFunction}
        disabled={buttonDisable}
        style={{
          marginTop: "15px",
          width: "415px",
          color: "white",
          fontSize: "20px",
          backgroundColor: "#8db5d9",
        }}
      >
        Search
      </button>
    </div>
  );
}
