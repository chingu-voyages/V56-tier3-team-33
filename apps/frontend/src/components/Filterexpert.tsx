import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../assets/landing.module.css";
const cities = ["Paris", "London", "Shanghai", "Beijing", "Bern", "Lausanne"];
const specialities = [
  "Cardiology",
  "Dermatology",
  "Generalist",
  "Neurology",
  "Psychastry",
];

export default function Filterexpert() {
  const [city, setCity] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const navigate = useNavigate();

  //const submitButtonFunction = () => {
  //navigate(`/result?city=${encodeURIComponent(city)}&specialite=${encodeURIComponent(speciality)}`);
  //}
  const submitButtonFunction = () => {
    navigate(
      `/result?city=${encodeURIComponent(city)}&specialite=${encodeURIComponent(speciality)}`,
    );
  };

  const buttonDisable = !city || !speciality;

  return (
    <div style={{ paddingLeft: "70px" }}>
      <div>
        <label className={styles.inputLabel}>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Choose your city</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.inputLabel}>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          >
            <option value="">Choose your speciality</option>
            {specialities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={submitButtonFunction}
        disabled={buttonDisable}
        style={{ width: "380px", color: "white", fontSize: "20px" }}
      >
        Search
      </button>
    </div>
  );
}
