"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import Button from "@/components/button/Button";
import { arrowDown, arrowUp } from "../../../common/svg";
import Link from "next/link";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.burgerMenu}>
      <article className={`${styles.btnCont} `} onClick={toggleMenu}>
        <h3>All departments</h3>

        <div className={styles.btnArrow}>
          <Button className={styles.burgerButton}>
            <i className="fa-solid fa-bars"></i>
          </Button>
          <span className={`${!isOpen ? styles.arrowTransform : ""}`}>
            {arrowUp}
          </span>
        </div>
      </article>
      {/* {isOpen && ( */}
      <div className={`${styles.menu} ${!isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
      </div>
      {/* )} */}
    </section>
  );
};

export default BurgerMenu;
