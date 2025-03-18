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

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Special Offers", path: "/special-offers" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className={style.burgerMenuContainer}>
      <Button 
        type="text" 
        className={style.menuButton} 
        onClick={showDrawer}
        icon={<MenuOutlined />}
      >
        <span>Categories</span>
      </Button>
      
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        className={style.menuDrawer}
      >
        <div className={style.drawerContent}>
          <div className={style.menuList}>
            {menuItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.path}
                className={`${style.menuItem} ${pathname === item.path ? style.active : ''}`}
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className={style.contactInfo}>
            <h3>Contact Us</h3>
            <p>Monday - Friday, 9am - 5pm</p>
            <a href="tel:+123456789" className={style.phoneNumber}>+1 (234) 567-89</a>
            <a href="mailto:info@yourdomain.com" className={style.email}>info@yourdomain.com</a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BurgerMenu;
