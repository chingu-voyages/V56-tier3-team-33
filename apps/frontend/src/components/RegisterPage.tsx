import RegisterForm from "./RegisterForm";
import styles from "../assets/loginPage.module.css"; // 👈 import your CSS module

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
