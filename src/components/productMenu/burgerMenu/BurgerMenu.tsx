"use client";

import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Button from "@/components/button/Button";
import { arrowUp } from "../../../common/svg";
import Link from "next/link";
import { categories } from "@/data/categories.js";

interface BurgerMenu {
  activeMenu: boolean;
}

const BurgerMenu: React.FC<BurgerMenu> = ({ activeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenHome, setIsOpenHome] = useState(activeMenu);

  useEffect(() => {
    setIsOpenHome(window.innerWidth >= 768);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsOpenHome(!isOpenHome);
  };

  return (
    <section className={styles.burgerMenu}>
      <article className={`${styles.btnCont} `} onClick={toggleMenu}>
        <h3>კატეგორიები</h3>

        <div className={styles.btnArrow}>
          <Button className={styles.burgerButton}>
            <i className="fa-solid fa-bars"></i>
          </Button>
          <span className={`${!isOpen ? styles.arrowTransform : ""}`}>
            {arrowUp}
          </span>
        </div>
      </article>
      <div
        className={`${styles.menu} 
        ${isOpen && !activeMenu ? styles.open : ""} 
        ${isOpenHome && activeMenu ? `${styles.homePageMenu} ` : ""} 
        ${isOpenHome && styles.homePageMenuMobile} `}
      >
        <ul>
          <li>
            <Link href={`/`}>ყველა</Link>
          </li>
          {categories.slice(1).map((el: any) => (
            <li key={el.value}>
              <Link href={`/?category=${el.value}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BurgerMenu;
