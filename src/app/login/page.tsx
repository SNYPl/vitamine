'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import ParamInfo from "@/components/shopPage/paramInfo/ParamInfo";
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoginComponent from "@/components/login/Login";

export default function LoginPage() {
  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginBackground}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.logoContainer}>
          <img src="/images/vitvitLogo.png" alt="Logo" className={styles.logo} />
        </div>
        <LoginComponent />
      </div>
    </main>
  );
}
