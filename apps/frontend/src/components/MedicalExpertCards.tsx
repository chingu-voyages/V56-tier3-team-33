import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as expertsService from "../services/experts";
import { Combobox } from "./Combobox";
import { Label } from "../components/userInterface/label";
import Nav from "../components/Nav";

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
  phone: string;
};

export default function MedicalExpertCards() {
  const [experts, setExperts] = useState<Expert[]>([]);
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

  const filteredList = useMemo(() => {
    return experts.filter((expert) => {
      const matchesSpecialty = specialtyFilter
        ? expert.specialty == specialtyFilter
        : true;
      const matchesCity = cityFilter ? expert.city == cityFilter : true;
      return matchesSpecialty && matchesCity;
    });
  }, [experts, specialtyFilter, cityFilter]);

  return (
    <div>
      <ExpertsFilter
        experts={experts}
        specialtyFilter={specialtyFilter}
        cityFilter={cityFilter}
        onSpecialtyChange={(e) =>
          setSpecialtyFilter(e === specialtyFilter ? "" : e)
        }
        onCityChange={(e) => setCityFilter(e === cityFilter ? "" : e)}
      />
      <ExpertsList experts={filteredList} />
    </div>
  );
}

function ExpertsFilter({
  experts,
  specialtyFilter,
  cityFilter,
  onSpecialtyChange,
  onCityChange,
}: {
  specialtyFilter: string;
  cityFilter: string;
  experts: Expert[];
  onSpecialtyChange: (specialty: string) => void;
  onCityChange: (city: string) => void;
}) {
  return (
    <>
      <Nav />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Label style={{ margin: "10px" }}>
          specialty:
          <Combobox
            items={specialties
              .filter((specialty) =>
                experts.some((expert) => expert.specialty === specialty),
              )
              .map((specialty) => ({ label: specialty, value: specialty }))}
            selectedValue={specialtyFilter}
            onChange={onSpecialtyChange}
            placeholder="all"
          />
        </Label>

        <Label style={{ margin: "10px" }}>
          city:
          <Combobox
            items={cities
              .filter(({ city }) =>
                experts.some(
                  (expert) => expert.city.toLowerCase() === city.toLowerCase(),
                ),
              )
              .map(({ city }) => ({ label: city, value: city }))}
            selectedValue={cityFilter}
            onChange={onCityChange}
            placeholder="all"
          />
        </Label>
      </div>
    </>
  );
}

function ExpertsList({ experts }: { experts: Expert[] }) {
  return (
    <div className={styles.grid}>
      {experts.length > 0 ? (
        experts.map((expert) => <ExpertCard key={expert.id} expert={expert} />)
      ) : (
        <p>No expert found.</p>
      )}
    </div>
  );
}

function ExpertCard({ expert }: { expert: Expert }) {
  const navigate = useNavigate();

  function handleExpertClick(id: string) {
    navigate(`/experts/${id}`);
  }

  return (
    <div
      key={expert.id}
      className={styles.card}
      onClick={() => handleExpertClick(expert.id)}
      onKeyDown={(e) => e.key === "Enter" && handleExpertClick(expert.id)}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
    >
      <img src={expert.photoUrl} alt={expert.name} className={styles.photo} />
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
      <p className={styles.specialty}>{expert.phone}</p>
    </div>
  );
}
