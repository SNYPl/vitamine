'use client';

import styles from './page.module.css';
import ForgotPasswordComponent from "@/components/forgotPassword/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <main className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordBackground}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <div className={styles.forgotPasswordWrapper}>
        <div className={styles.logoContainer}>
          <img src="/images/vitvitLogo.png" alt="Logo" className={styles.logo} />
        </div>
        <ForgotPasswordComponent />
      </div>
    </main>
  );
}
