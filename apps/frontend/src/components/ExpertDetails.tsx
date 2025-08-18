import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../assets/medicalExpertDetail.module.css";

type MedicalExpert = {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  photoUrl: string;
  // Add more fields
};

const experts: MedicalExpert[] = [
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

const ExpertDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const expert = experts.find((exp) => exp.id === id);

  if (!expert) {
    return (
      <div className={styles.notFound}>
        <h2>Expert Not Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className={styles.detailsContainer}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img src={expert.photoUrl} alt={expert.name} className={styles.photo} />
      <h1 className={styles.name}>{expert.name}</h1>
      <p className={styles.specialty}>
        <strong>Specialty:</strong> {expert.specialty}
      </p>
      <p className={styles.languages}>
        <strong>Languages:</strong> {expert.languages.join(", ")}
      </p>
    </div>
  );
};

export default ExpertDetails;
