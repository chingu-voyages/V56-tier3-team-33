import Nav from "./Nav";
import styles from "../assets/landing.module.css";
import { useNavigate } from "react-router-dom";
import image from "../assets/hero 1.png";
import Filterexpert from "./Filterexpert";
import image2 from "../assets/Doctor Invite Photo 1.png";
import { Link } from "react-router-dom";

const Landing = () => {
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
          <div style={{ marginTop: "100px" }}>
            <Filterexpert />
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
      <div className={styles.containerImageFilter}>
        <div
          className={styles.containerFilter}
          style={{ display: "flex", justifyContent: "end" }}
        >
          <img src={image2} alt="Picture of on doctor smiling to us" />
        </div>
        <div className={styles.containertext2}>
          <p>Are you a medical professional?</p>
          <p>share your expertise with new</p>
          <p>clients today</p>
          <div className={styles.containertext3}>
            <p>Join thousands of medical professional</p>
            <p>who trusted Wecare to connect them with</p>
            <p>nearby patients in need of your expertise</p>
          </div>
          <Link
            to="/signup"
            style={{
              display: "inline-block",
              padding: "26px 36px",
              backgroundColor: "#8DB5D9",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "22px",
              fontWeight: 1000,
            }}
          >
            join as expert
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
