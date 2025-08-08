import React from "react";
import Nav from "./Nav";
import styles from "../assets/landing.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import image from "../assets/hero 1.png";

type Props = {};

const Landing = (props: Props) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className={styles.containerLanding}>
      <Nav onLoginClick={handleLoginClick} />
      <div className={styles.textIntro}>
        <p>Find the right medical</p>
        <p>expert - anytime, anywhere</p>
      </div>
      <div className={styles.containerImageFilter}>
        <div className={styles.containerFilter}>
          <div className={styles.textFilter}>
            <p>Connect with trusted medical</p>
            <p>professionals based on your needs,</p>
            <p>location, and preferences.</p>
          </div>
        </div>

        <div className={styles.containerImage}>
          <img
            src={image}
            alt="This is a picture of doctors and patients"
            className={styles.imageProject}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
