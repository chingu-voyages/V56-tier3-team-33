import React, { useEffect, useState } from "react";
import styles from "../assets/medicalExpertCards.module.css";
import { useNavigate } from "react-router-dom";

type MedicalExpert = {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  photoUrl: string;
};

export const experts: MedicalExpert[] = [
  {
    id: "1",
    name: "Dr. Alice Dupont",
    specialty: "Cardiology",
    languages: ["French", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Dr. Marc Leclerc",
    specialty: "Neurology",
    languages: ["French"],
    photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "3",
    name: "Dr. Sarah Müller",
    specialty: "Dermatology",
    languages: ["German", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/46.jpg",
  },
  {
    id: "4",
    name: "Dr. John Zhang",
    specialty: "Psychastry",
    languages: ["Chinese", "French"],
    photoUrl: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: "5",
    name: "Dr. Anna Rossi",
    specialty: "Generalist",
    languages: ["Italian", "English"],
    photoUrl: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

const MedicalExpertCards: React.FC = () => {
  const navigate = useNavigate();

  /*
  const [experts, setExperts] = useState<MedicalExpert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect( () => {
    fetch(/api/experts) //this would be our api endpoint
    .then((res) => {
      if(!res.ok){
        throw new Error("There is a problem in the network");
      }
      return res.json();
    }).then((data: MedicalExpert[]) => {
      setExperts(data);
      setLoading(false);
    })
  } , [])*/

  const cardClick = (id: string) => {
    navigate(`/expert/${id}`);
  };
  return (
    <div className={styles.grid}>
      {experts.map((expert) => (
        <div
          key={expert.id}
          className={styles.card}
          onClick={() => cardClick(expert.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && cardClick(expert.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={expert.photoUrl}
            alt={expert.name}
            className={styles.photo}
          />
          <h3 className={styles.name}>{expert.name}</h3>
          <p className={styles.specialty}>{expert.specialty}</p>
          <p className={styles.languages}>{expert.languages.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalExpertCards;
