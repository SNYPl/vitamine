"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import styles from "./style.module.scss";

import { navigatorData } from "../../../../../data/Menu";
import Link from "next/link";
import SocialIcons from "../../../topNav/socials/Socials";
import { useSession } from "next-auth/react";
import LoginBtn from "@/components/header/topNav/authBtns/LoginBtn";
import SignOut from "@/components/header/topNav/authBtns/SignOutBtn";

interface MobileNavigatorProps {
  onClose?: () => void;
}

function MobileNavigator({ onClose }: MobileNavigatorProps) {
  const [current, setCurrent] = useState("mail");
  const { data: session } = useSession();
  
  const handleClick = (e: any) => {
    setCurrent(e.key);
  };
  
  const handleClose = () => {
    if (onClose) onClose();
  };
  
  // Custom wrapped login button that closes drawer when clicked
  const WrappedLoginBtn = () => (
    <div onClick={handleClose}>
      <LoginBtn />
    </div>
  );
  
  const loginComponent = !session?.user ? (
    <WrappedLoginBtn />
  ) : (
    <div onClick={handleClose}>
      <SignOut user={session?.user.name} />
    </div>
  );
  
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
            <Link href={el.href} onClick={handleClose}>{el.title}</Link>
          </Menu.Item>
        ))}
      </Menu>

      <div className={styles.mobileLogin}>
        {loginComponent}
        <SocialIcons />
      </div>
    </div>
  );
}

export default React.memo(MobileNavigator);
