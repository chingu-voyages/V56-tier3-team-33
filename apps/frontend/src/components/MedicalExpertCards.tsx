import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as expertsService from "../services/experts";

import styles from "../assets/medicalExpertCards.module.css";
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

export const experts: Expert[] = [
  {
    id: "1",
    name: "Dr. Alice Dupont",
    gender: "F",
    specialty: "Cardiology",
    city: "Paris",
    languages: ["French", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Marc Leclerc",
    gender: "M",
    specialty: "Neurology",
    city: "Burssels",
    languages: ["French"],
    photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "3",
    name: "Dr. Sarah Müller",
    gender: "F",
    specialty: "Dermatology",
    city: "Berlin",
    languages: ["German", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    id: "4",
    name: "Dr. John Zhang",
    gender: "M",
    specialty: "Psychastry",
    city: "Beijing",
    languages: ["Chinese", "French"],
    photoUrl: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: "5",
    name: "Dr. Anna Rossi",
    gender: "F",
    specialty: "Generalist",
    city: "Rome",
    languages: ["Italian", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

export default function MedicalExpertCards() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState<Expert[]>([]);

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

  const handleCardClick = (id: string) => {
    navigate(`/expert/${id}`);
  };
  return (
    <div className={styles.grid}>
      {experts.map((expert) => (
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
  );
}
