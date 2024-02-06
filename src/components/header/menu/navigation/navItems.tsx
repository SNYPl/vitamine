"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";

import { navigatorData } from "../../../../data/Menu";
import Link from "next/link";

function NavItems() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <>
      {navigatorData.map((el: any, id: number) => (
        <li
          className={styles.navItem}
          key={id}
          onClick={() => setActive(el.href)}
        >
          <Link
            href={el.href}
            className={`${styles.navTitle} ${
              active === el.href ? styles.active : ""
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
