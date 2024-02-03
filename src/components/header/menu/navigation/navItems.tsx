"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";

import { navigatorData } from "../../../../data/Menu";
import Link from "next/link";

function NavItems() {
  const [active, setActive] = useState("Home");
  return (
    <>
      {navigatorData.map((el: any, id: number) => (
        <li
          className={styles.navItem}
          key={id}
          onClick={() => setActive(el.title)}
        >
          <Link
            href={el.href}
            className={`${styles.navTitle} ${
              active === el.title ? styles.active : ""
            }`}
          >
            {el.title}
          </Link>
        </li>
      ))}
    </>
  );
}

export default NavItems;
