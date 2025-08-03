import React, { useState } from "react";
import styles from "./login.module.css";
import Signup from "./Signup";
import SignupProfessional from "./SignupProfessional";
import Signupclient from "./Signupclient";
/**
 * @param {{ onClose: () => void }} props
 */

export default function Login({ onClose }) {
  const [mode, setMode] = useState("login");
  const previous = () => setMode("login");
  return (
    <div>
      {mode === "login" && (
        <>
          <div className={styles.modaloverlay} onClick={onClose}>
            <div
              className={styles.modalcontent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeTag} onClick={onClose}>
                X
              </button>
              <h2>Login</h2>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button>Submit</button>
              <p>
                Have you an account?
                <span onClick={() => setMode("choose")}>Sign up</span>
              </p>
            </div>
          </div>
        </>
      )}
      {mode === "choose" && (
        <>
          <Signup setMode={setMode} onClose={onClose} previous={previous} />
        </>
      )}
      {mode === "professional" && (
        <>
          <SignupProfessional
            setMode={setMode}
            onClose={onClose}
            previous={previous}
          />
        </>
      )}
      {mode === "client" && (
        <>
          <Signupclient
            setMode={setMode}
            onClose={onClose}
            previous={previous}
          />
        </>
      )}
    </div>
  );
}
