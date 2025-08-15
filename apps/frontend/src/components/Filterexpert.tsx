import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // ✅ Ajouter useEffect ici
import styles from "../assets/landing.module.css";
import { Combobox } from "./Combobox"; // 🔁 Remplace `ComboboxDemo` par `Combobox`

type ComboboxItem = {
  value: string;
  label: string;
};

const specialities = [
  "Cardiology",
  "Dermatology",
  "Generalist",
  "Neurology",
  "Psychastry",
];

export default function Filterexpert() {
  const [city, setCity] = useState<string>("");
  const [cities, setCities] = useState<ComboboxItem[]>([]); // ✅ Nouveau state
  const [loadingCities, setLoadingCities] = useState(true); // ✅ Nouveau state
  const [error, setError] = useState<string | null>(null); // ✅ Nouveau state
  const [speciality, setSpeciality] = useState<string>("");
  const navigate = useNavigate();

  // ✅ FETCH des villes depuis l'API
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch("http://localhost:3000/api/cities"); // 🔁 Met l’URL de ton API ici
        if (!response.ok) {
          throw new Error("Failed to load cities");
        }

        const data = await response.json();

        // 🔁 Si API retourne juste ["Paris", "London"], on formate
        const formatted =
          typeof data[0] === "string"
            ? data.map((city: string) => ({ value: city, label: city }))
            : data;

        setCities(formatted);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingCities(false);
      }
    }

    fetchCities();
  }, []);

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
          {/* 🔁 Remplace ici le <ComboboxDemo /> */}
          {loadingCities ? (
            <p>Loading cities...</p> // ✅ Affiche pendant chargement
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p> // ✅ En cas d’erreur
          ) : (
            <Combobox
              items={cities}
              selectedValue={city}
              onChange={setCity}
              placeholder="Choose your city"
            />
          )}
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
