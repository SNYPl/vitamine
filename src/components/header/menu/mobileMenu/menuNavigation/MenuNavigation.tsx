"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import styles from "./style.module.scss";

import navigatorData from "../../../../../data/navigator.json";
import Link from "next/link";
import SocialIcons from "../../../topNav/socials/Socials";

function MobileNavigator() {
  const { SubMenu } = Menu;
  const [current, setCurrent] = useState("mail");
  const handleClick = (e: any) => {
    // console.log("click ", e);
    // this.setState({ current: e.key });
  };
  return (
    <div className={styles.menuMobile}>
      <Menu
        className="menu-mobile-navigator"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        <Menu.Item key="homepage">
          <Link href={process.env.PUBLIC_URL + navigatorData.ABOUT.href}>
            {navigatorData.HOME.title}
          </Link>
        </Menu.Item>

        <Menu.Item key="shop">
          <Link href={process.env.PUBLIC_URL + navigatorData.SHOP.href}>
            {navigatorData.SHOP.title}
          </Link>
        </Menu.Item>

        <Menu.Item key="pages">
          <Link href={process.env.PUBLIC_URL + navigatorData.PAGES.href}>
            {navigatorData.PAGES.title}
          </Link>
        </Menu.Item>

        <Menu.Item key="alipay">
          <Link href={process.env.PUBLIC_URL + navigatorData.ABOUT.href}>
            {navigatorData.ABOUT.title}
          </Link>
        </Menu.Item>
      </Menu>

      <div className={styles.mobileLogin}>
        <Link href={process.env.PUBLIC_URL + "/other/login"}>
          Login / Register
        </Link>

        <SocialIcons />
      </div>
    </div>
  );
}

export default React.memo(MobileNavigator);
