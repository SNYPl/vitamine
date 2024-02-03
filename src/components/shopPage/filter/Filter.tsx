import React from "react";
import style from "./style.module.scss";
import CategoriesFilter from "./categories/Categories";
import PriceFilter from "./price/Price";

const Filter: React.FC = ({}) => {
  return (
    <section className={`${style.filter}`}>
      <CategoriesFilter />
      <PriceFilter />
    </section>
  );
};

export default Filter;
