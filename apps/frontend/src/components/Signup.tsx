import React from "react";
import styles from "../assets/login.module.css";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={`${styles.modalcontent} ${styles.chooseDesign}`}>
          <button className={styles.closeBtn1} onClick={() => navigate("/")}>
            X
          </button>
          <button
            className={styles.previousDesign}
            onClick={() => navigate("/login")}
          >
            previous
          </button>
          <div className={styles.chooseFormDesign}>
            <button onClick={() => navigate("/signup/professional")}>
              medical professional
            </button>
            <button onClick={() => navigate("/signup/client")}>
              client(customer)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
