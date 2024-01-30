import React from "react";
import style from "./style.module.scss";

interface featureMenu {
  setActiveMenu: any;
  activeMenu: string;
}

const featuredMenu = [
  { name: "All", value: "all" },
  { name: "Bread", value: "bread" },
  { name: "Fastfood", value: "fast-food" },
  { name: "Fresh meat", value: "fresh-meat" },
  { name: "Ocean foods", value: "ocean-foods" },
  { name: "Oranges", value: "oranges" },
  { name: "Organic drinks", value: "organic-drinks" },
  { name: "Vegetables", value: "vegetables" },
];

const FeaturedProducts: React.FC<featureMenu> = ({
  setActiveMenu,
  activeMenu,
}) => {
  return (
    <ul className={`${style.featureList}`}>
      {featuredMenu.slice(0, 5).map((el: any, id: any) => (
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
