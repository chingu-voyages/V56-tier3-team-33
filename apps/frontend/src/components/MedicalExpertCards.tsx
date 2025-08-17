import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as expertsService from "../services/experts";
import { Combobox } from "./Combobox";

import styles from "../assets/medicalExpertCards.module.css";
import specialties from "../data/specialties.json";
import cities from "../data/cities.json";
import supportedLanguages from "../data/languages.json";

type Expert = {
  id: string;
  name: string;
  gender: "M" | "F";
  specialty: string;
  city: string;
  languages: string[];
  photoUrl: string;
};

export default function MedicalExpertCards() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  useEffect(() => {
    expertsService
      .getExperts()
      .then((data) => {
        if (data.type !== "success") {
          console.error(data.error);
        }
        setExperts(data.experts);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const filteredList = experts.filter((expert) => {
      let matchesSpecialty = true;
      if (specialtyFilter) {
        matchesSpecialty = expert.specialty == specialtyFilter;
      }

      let matchesCity = true;
      if (cityFilter) {
        matchesCity = expert.city == cityFilter;
      }

      return matchesSpecialty && matchesCity;
    });

    setFilteredExperts(filteredList);
  }, [experts, specialtyFilter, cityFilter]);

  const handleCardClick = (id: string) => {
    navigate(`/experts/${id}`);
  };
  return (
    <>
      <Combobox
        items={specialties
          .filter((specialty) =>
            experts.some((expert) => expert.specialty === specialty),
          )
          .map((specialty) => ({ label: specialty, value: specialty }))}
        selectedValue={specialtyFilter}
        onChange={(e) => {
          setSpecialtyFilter(e === specialtyFilter ? "" : e);
        }}
        placeholder="all"
      />

      <Combobox
        items={cities
          .filter(({ city }) =>
            experts.some(
              (expert) => expert.city.toLowerCase() === city.toLowerCase(),
            ),
          )
          .map(({ city }) => ({ label: city, value: city }))}
        selectedValue={cityFilter}
        onChange={(e) => {
          setCityFilter(e === cityFilter ? "" : e);
        }}
        placeholder="all"
      />
      <div className={styles.grid}>
        {filteredExperts.map((expert) => (
          <div
            key={expert.id}
            className={styles.card}
            onClick={() => handleCardClick(expert.id)}
            onKeyDown={(e) => e.key === "Enter" && handleCardClick(expert.id)}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
          >
            <img
              src={expert.photoUrl}
              alt={expert.name}
              className={styles.photo}
            />
            <h3 className={styles.name}>{expert.name}</h3>
            <p className={styles.specialty}>{expert.specialty}</p>
            <p className={styles.specialty}>{expert.city}</p>
            <p className={styles.languages}>
              {expert.languages
                .map(
                  (code) =>
                    supportedLanguages[code as keyof typeof supportedLanguages],
                )
                .join(", ")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
