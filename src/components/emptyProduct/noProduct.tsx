import React from "react";
import style from "./style.module.scss";

type props = {
  title: string;
};

const NoProduct: React.FC<props> = ({ title }) => {
  return (
    <section className={`${style.noProduct}`}>
      <i className="fa-regular fa-envelope-open"></i>

      <p>{title}</p>
    </section>
  );
};

export default NoProduct;
