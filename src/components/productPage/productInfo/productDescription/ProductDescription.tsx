"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Description from "./description/Description";
import Specifications from "./specifications/Specifications";
import Review from "./review/Review";
import Button from "@/components/button/Button";

const ProductDescription: React.FC = ({}) => {
  const menuItems = ["description", "specifications", "review"];
  const [menuHandler, setMenuHandler] = useState<string | boolean>(
    "description"
  );
  return (
    <section className={`${style.productDescription}`}>
      <ul className={`${style.menuList}`}>
        {menuItems.map((el: string, id: number) => (
          <li key={id}>
            <Button
              className={`${style.menuButton} ${
                menuHandler === el ? style.active : ""
              }`}
              onSubmitButton={() => setMenuHandler(el)}
            >
              {el}
            </Button>
          </li>
        ))}
      </ul>
      <section className={`${style.productInfo}`}>
        {menuHandler === "description" && <Description />}
        {menuHandler === "specifications" && <Specifications />}
        {menuHandler === "review" && <Review />}
      </section>
    </section>
  );
};

export default ProductDescription;
