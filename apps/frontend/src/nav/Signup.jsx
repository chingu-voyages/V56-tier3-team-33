import React from "react";
import styles from "./login.module.css";

export default function Signup({ onClose, previous, setMode }) {
  return (
    <div>
      <div className={styles.modaloverlay}>
        <div className={`${styles.modalcontent} ${styles.chooseDesign}`}>
          <button className={styles.closeTag} onClick={onClose}>
            X
          </button>
          <button className={styles.previousDesign} onClick={() => previous()}>
            previous
          </button>
          <div className={styles.chooseFormDesign}>
            <button onClick={() => setMode("professional")}>
              medical professional
            </button>
            <button onClick={() => setMode("client")}>client(customer)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
