"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import styles from "./style.module.scss";

import { navigatorData } from "../../../../../data/Menu";
import Link from "next/link";
import SocialIcons from "../../../topNav/socials/Socials";

function MobileNavigator() {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <div className={styles.menuMobile}>
      <Menu
        className="menu-mobile-navigator"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        {navigatorData.map((el: any, id: number) => (
          <Menu.Item key={el.title}>
            <Link href={el.href}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu>

      <div className={styles.mobileLogin}>
        <Link href={process.env.PUBLIC_URL + "/other/login"}>
          შესვლა / რეგისტრაცია
        </Link>

        <SocialIcons />
      </div>
    </div>
  );
}

export default React.memo(MobileNavigator);
