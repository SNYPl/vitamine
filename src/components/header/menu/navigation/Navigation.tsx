"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import styles from "./style.module.scss";

import navigatorData from "../../../../data/navigator.json";
import Link from "next/link";

function Navigator() {
  const { SubMenu } = Menu;
  const [current, setCurrent] = useState("mail");
  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <ul className={`${styles.navigation} nav-menu`}>
      <li className={styles.navItem}>
        <Link href={navigatorData.HOME.href} className={styles.navTitle}>
          {navigatorData.HOME.title}
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          href={process.env.PUBLIC_URL + navigatorData.SHOP.href}
          className={styles.navTitle}
        >
          {navigatorData.SHOP.title}
        </Link>
      </li>

      <li className={styles.navItem}>
        <Link
          href={process.env.PUBLIC_URL + navigatorData.PAGES.href}
          className={styles.navTitle}
        >
          {navigatorData.PAGES.title}
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          href={process.env.PUBLIC_URL + navigatorData.ABOUT.href}
          className={styles.navTitle}
        >
          {navigatorData.ABOUT.title}
        </Link>
      </li>
    </ul>
  );
}

export default React.memo(Navigator);
