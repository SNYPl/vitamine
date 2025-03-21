"use client";
import React from "react";
import style from "./style.module.scss";

const ProductTitles: React.FC = () => {
  const titles = [
    "სურათი",
    "პროდუქტის სახელი",
    "ფასი",
    "კალათაში დამატება",
    "წაშლა",
  ];

  return (
    <div className={style.titleContainer}>
      <div className={style.titlesForm}>
        {titles.map((title: string, index: number) => {
          return <p key={title || `title-${index}`}>{title}</p>;
        })}
      </div>
    </div>
  );
};

export default ProductTitles;
