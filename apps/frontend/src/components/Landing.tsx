import Nav from "./Nav";
import styles from "../assets/landing.module.css";
import image from "../assets/hero 1.png";
import Filterexpert from "./Filterexpert";
import image2 from "../assets/Doctor Invite Photo 1.png";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Landing = () => {
  const authContext = useAuth();
  return (
    <div className={styles.containerLanding}>
      <>
        <Nav />
      </>
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
          <div className={styles.adjustmentMargin}>
            <Filterexpert />
          </div>
        </div>

        <div className={styles.containerImage}>
          <img src={image} alt="Doctors and Patients" />
        </div>
      </div>
      {!authContext.user ? (
        <div className={styles.containerImageFilter}>
          <div
            className={`${styles.containerFilter} ${styles.containerImage2}`}
          >
            <img src={image2} alt="Doctor smiling" />
          </div>
          <div className={styles.expertIntroSection}>
            <p>Are you a medical professional?</p>
            <p>Share your expertise with new</p>
            <p>clients today</p>
            <div className={styles.expertDescription}>
              <p>Join thousands of medical professional</p>
              <p>who trusted Wecare to connect them with</p>
              <p>nearby patients in need of your expertise</p>
            </div>
            <Link className={styles.signupStyle} to="/signup">
              Join as an Expert
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Landing;
