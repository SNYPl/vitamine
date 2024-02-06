import React from "react";
import style from "./style.module.scss";
import { categories } from "@/data/categories";

interface featureMenu {
  setActiveMenu: any;
  activeMenu: string;
}

const FeaturedProducts: React.FC<featureMenu> = ({
  setActiveMenu,
  activeMenu,
}) => {
  return (
    <ul className={`${style.featureList}`}>
      {categories.slice(0, 5).map((el: any, id: any) => (
        <li
          key={id}
          onClick={() => setActiveMenu(el.value)}
          className={activeMenu === el.value ? style.active : undefined}
        >
          {el.name}
        </li>
      ))}
    </ul>
  );
};

export default FeaturedProducts;
