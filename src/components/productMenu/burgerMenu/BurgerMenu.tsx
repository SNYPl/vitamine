"use client";

import React, { useState } from "react";
import style from "./style.module.scss";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories.js";

interface BurgerMenuProps {
  activeMenu: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ activeMenu = false }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.burgerMenuContainer}>
      <Button
        type="text"
        className={style.menuButton}
        onClick={showDrawer}
        icon={<MenuOutlined />}
      >
        <span>კატეგორია</span>
      </Button>

      <Drawer
        title="მენიუ"
        placement="left"
        onClose={onClose}
        open={open}
        className={style.menuDrawer}
      >
        <div className={style.drawerContent}>
          <div className={style.menuList}>
            {categories.map((item, index) => (
              <Link
                key={index}
                href={`./?category=${item.value}`}
                className={`${style.menuItem} ${
                  pathname === item.value ? style.active : ""
                }`}
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className={style.contactInfo}>
            <h3>დაგვიკავშირდით</h3>
            <p>ორშაბათი - პარასკევი, 9am - 8pm</p>
            <a href="tel:+995558383881" className={style.phoneNumber}>
              +995 558383881
            </a>
            <a href="mailto:vitamine.vitvit@gmail.com" className={style.email}>
              vitamine.vitvit@gmail.com
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;
