import { Link } from "react-router-dom";
import styles from "../assets/nav.module.css";

export default function Nav() {
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

          <Link className={styles.loginDetail} to="/login">
            <div className={styles.loginDetail2}>Login</div>
          </Link>
        </div>
      </header>
    </div>
  );
}
