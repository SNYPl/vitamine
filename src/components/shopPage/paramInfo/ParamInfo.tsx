"use client";

import React from "react";
import style from "./style.module.scss";
import { usePathname } from "next/navigation";

const ParamInfo: React.FC = () => {
  const path = usePathname();
  const pathArray = path.split("/").filter((el: any) => el);
  const pathString = pathArray.join();

  const paths = [
    { eng: "shop", geo: "მაღაზია" },
    { eng: "about", geo: "ჩვენს შესახებ" },
    { eng: "contact", geo: "კონტაქტი" },
  ];

  const geopath = paths.filter((el: any) => el.eng === pathString);

  const { geo } = geopath[0];

  return (
    <section className={`${style.info}`}>
      <i className="fa-solid fa-house-chimney"></i>
      <p className={`${style.params}`}>მთავარი </p>

      <p className={`${style.addedParams}`}>
        <span className={`${style.paramArrow}`}>{">"}</span>
        {geo}
      </p>
    </section>
  );
};

export default ParamInfo;
