"use client";

import React from "react";
import style from "./style.module.scss";
import { usePathname } from "next/navigation";

const ParamInfo: React.FC = () => {
  const path = usePathname();
  const pathArray = path?.split("/").filter((el) => el);

  const paths = [
    { eng: "shop", geo: "შეთავაზებები" },
    { eng: "about", geo: "ჩვენს შესახებ" },
    { eng: "contact", geo: "კონტაქტი" },
    { eng: "cart", geo: "კალათა" },
    { eng: "login", geo: "ავტორიზაცია" },
    { eng: "signup", geo: "რეგისტრაცია" },
    { eng: "forgotPassword", geo: "პაროლის აღდგენა" },
    { eng: "verify", geo: "ვერიფიკაცია" },
    { eng: "wishlist", geo: "ფავორიტები" },
    { eng: "profile", geo: "პროფილი" },
  ];

  const translatePath = (engPath: any) => {
    const geopath = paths.find((el) => el.eng === engPath);
    return geopath ? geopath.geo : engPath;
  };

  return (
    <section className={`${style.info}`}>
      <i className="fa-solid fa-house-chimney"></i>
      <p className={`${style.params}`}>მთავარი </p>

      <p className={`${style.addedParams}`}>
        {pathArray?.map((el: any) => (
          <React.Fragment key={el}>
            <span className={`${style.paramArrow}`}>{">"}</span>
            <span>{translatePath(el)}</span>
          </React.Fragment>
        ))}
      </p>
    </section>
  );
};

export default ParamInfo;
