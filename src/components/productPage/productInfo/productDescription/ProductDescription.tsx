"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import Description from "./description/Description";
import Specifications from "./specifications/Specifications";
import Review from "./review/Review";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

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
  id: string;
  user: any;
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
  id,
  user,
}) => {
  const items: TabsProps["items"] = [
    {
      key: "description",
      label: "პროდუქტის აღწერა",
      children: (
        <Description
          name={name}
          about={about}
          description={description}
          otherIngredients={otherIngredients}
          use={use}
          warning={warning}
        />
      ),
    },
    {
      key: "facts",
      label: "პროდუქტის მონაცემები",
      children: <Specifications supplementFacts={supplementFacts} />,
    },
    {
      key: "review",
      label: `განხილვა (${review?.length || 0})`,
      children: <Review id={id} user={user} review={review} />,
    },
  ];

  return (
    <section className={`${style.productDescription}`}>
      <Tabs 
        defaultActiveKey="description" 
        items={items} 
        className={style.tabs}
        size="large"
        tabBarGutter={30}
      />
    </section>
  );
};

export default ProductDescription;
