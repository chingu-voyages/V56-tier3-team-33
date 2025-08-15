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

interface ExpertDetailsProps {
  experts: MedicalExpert[];
}

const ExpertDetails: React.FC<ExpertDetailsProps> = ({ experts }) => {
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
