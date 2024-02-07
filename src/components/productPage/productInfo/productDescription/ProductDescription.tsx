"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Description from "./description/Description";
import Specifications from "./specifications/Specifications";
import Review from "./review/Review";
import Button from "@/components/button/Button";

interface SupplementFact {
  _id: string;
  title: string;
  info: string;
}

interface descriptionProps {
  about: string;
  description: string[];
  otherIngredients: string[];
  review: [];
  supplementFacts: SupplementFact[];
  use: string;
  warning: string;
  name: string;
}

const ProductDescription: React.FC<descriptionProps> = ({
  about,
  description,
  otherIngredients,
  review,
  supplementFacts,
  use,
  warning,
  name,
}) => {
  const menuItems = [
    { geo: "პროდუქტის აღწერა", eng: "description" },
    { geo: "პროდუქტის მონაცემები", eng: "facts" },
    { geo: "განხილვა", eng: "review" },
  ];

  const [menuHandler, setMenuHandler] = useState<string | boolean>(
    "description"
  );
  return (
    <section className={`${style.productDescription}`}>
      <ul className={`${style.menuList}`}>
        {menuItems.map((el: any, id: number) => (
          <li key={id}>
            <Button
              className={`${style.menuButton} ${
                menuHandler === el.eng ? style.active : ""
              }`}
              onSubmitButton={() => setMenuHandler(el.eng)}
            >
              {el.geo}
            </Button>
          </li>
        ))}
      </ul>
      <section className={`${style.productInfo}`}>
        {menuHandler === "description" && (
          <Description
            name={name}
            about={about}
            description={description}
            otherIngredients={otherIngredients}
            use={use}
            warning={warning}
          />
        )}
        {menuHandler === "facts" && (
          <Specifications supplementFacts={supplementFacts} />
        )}
        {menuHandler === "review" && <Review />}
      </section>
    </section>
  );
};

export default ProductDescription;
