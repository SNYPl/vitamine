"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import VerifyAccount from "@/components/verify/Verify";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const verifyStatus = searchParams.get("verify");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading"
  );

  useEffect(() => {
    if (verifyStatus === "true") {
      setMessage(
        "Your account has been successfully verified! You can now log in."
      );
      setStatus("success");
    } else if (verifyStatus === "false") {
      setMessage(
        "Account verification failed. The verification link may be invalid or expired."
      );
      setStatus("error");
    } else {
      setMessage("Verifying your account...");
    }
  }, [verifyStatus]);

  return (
    <main className={styles.main}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ParamInfo />
        <VerifyAccount />
        <Companies />
        <div className={styles.verifyContainer}>
          <div className={styles.verifyCard}>
            <h1>Account Verification</h1>
            <div className={`${styles.messageBox} ${styles[status]}`}>
              <p>{message}</p>
            </div>
            {status !== "loading" && (
              <div className={styles.actionButtons}>
                <Link href="/login">
                  <button
                    className={`${styles.button} ${
                      status === "success" ? styles.primary : styles.secondary
                    }`}
                  >
                    {status === "success" ? "Login Now" : "Go to Login"}
                  </button>
                </Link>
                {status === "error" && (
                  <Link href="/contact">
                    <button className={styles.button}>Contact Support</button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
