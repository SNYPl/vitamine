"use client";

import React from "react";
import style from "./style.module.scss";
import { usePathname } from "next/navigation";

const ParamInfo: React.FC = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter((el: any) => el);

  return (
    <section className={`${style.info}`}>
      <i className="fa-solid fa-house-chimney"></i>
      <p className={`${style.params}`}>მთავარი </p>
      {pathArray.map((el: string, id: number) => (
        <p className={`${style.addedParams}`} key={id}>
          <span className={`${style.paramArrow}`}>{">"}</span>
          {el.charAt(0).toUpperCase() + el.slice(1)}
        </p>
      ))}
    </section>
  );
};

export default ParamInfo;
