import { Link } from "react-router-dom";
import styles from "../assets/nav.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function Nav() {
  const authContext = useAuth();
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

          {authContext.user ? (
            <div className={styles.loginDetail}>
              <button
                className={styles.loginDetail2}
                onClick={() => {
                  authContext.logout();
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link className={styles.loginDetail} to="/login">
              <div className={styles.loginDetail2}>Login</div>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
