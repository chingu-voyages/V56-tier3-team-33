import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Combobox } from "./Combobox";
import { Label } from "../components/userInterface/label";
import specialties from "../data/specialties.json";
import cities from "../data/cities.json";

import styles from "../assets/landing.module.css";

export default function Filterexpert() {
  const [city, setCity] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const navigate = useNavigate();

  const submitButtonFunction = () => {
    navigate("/experts", { state: { city, specialty } });
  };

  const citiesData = cities.map(({ city }) => ({ label: city, value: city }));
  citiesData.sort((a, b) => (a.label < b.label ? -1 : 1));
  citiesData.unshift({ label: "all", value: "" });

  const specialtiesData = specialties.map((specialty) => ({
    label: specialty,
    value: specialty,
  }));
  specialtiesData.sort((a, b) => (a.label < b.label ? -1 : 1));
  specialtiesData.unshift({ label: "all", value: "" });

  return (
    <div style={{ paddingLeft: "70px" }}>
      <div style={{ display: "flex", gap: "15px" }}>
        <Label className={styles.inputLabel}>
          city:
          <Combobox
            items={citiesData}
            selectedValue={city}
            onChange={setCity}
            placeholder="Choose your city"
          />
        </Label>

        <Label className={styles.inputLabel}>
          specialty:
          <Combobox
            items={specialtiesData}
            selectedValue={specialty}
            onChange={setSpecialty}
            placeholder="Choose your speciality"
          />
        </Label>
      </div>

      <button
        onClick={submitButtonFunction}
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
