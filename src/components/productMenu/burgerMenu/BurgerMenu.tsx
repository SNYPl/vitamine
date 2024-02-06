"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import Button from "@/components/button/Button";
import { arrowUp } from "../../../common/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories.js";

interface BurgerMenu {
  activeMenu: boolean;
}

const BurgerMenu: React.FC<BurgerMenu> = ({ activeMenu }) => {
  const path = usePathname();
  const homePage = path === "/" ? true : false;
  const [isOpen, setIsOpen] = useState(activeMenu);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        className={`${styles.menu} ${isOpen ? styles.open : ""} ${
          homePage ? styles.homePageMenu : styles.differentPages
        } `}
      >
        <ul>
          <li>
            <Link href={`/shop`}>ყველა</Link>
          </li>
          {categories.slice(1).map((el: any) => (
            <li key={el.value}>
              <Link href={`/shop?category=${el.value}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BurgerMenu;
