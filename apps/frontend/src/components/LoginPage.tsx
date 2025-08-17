import { LoginForm } from "./LoginForm";
import styles from "../assets/loginPage.module.css"; // 👈 import your CSS module

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
