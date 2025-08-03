import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
/**
 * @param {{ onLoginClick: () => void }} props
 */

export default function Nav({ onLoginClick }) {
  return (
    <div>
      <header>
        <div className={styles.navContainer}>
          <div className={styles.navContainer2}>
            <div className={styles.logoDetail}>
              <p className={styles.logoDetailP1}>We</p>
              <p className={styles.logoDetailP2}>Care</p>
            </div>
          </div>
          <Link
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
            className={styles.loginDetail}
            to="#"
          >
            <div className={styles.loginDetail2}>Login</div>
          </Link>
        </div>
      </header>
    </div>
  );
}
