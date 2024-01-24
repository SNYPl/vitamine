import React from "react";
import style from "./style.module.scss";
import Image from "next/image";

const servicesList = [
  {
    title: "FREE SHIPPING",
    info: "For all order over 99$",
    img: "/images/services/1.png",
  },
  {
    title: "DELIVERY ON TIME",
    info: "If good have prolems",
    img: "/images/services/2.png",
  },
  {
    title: "SECURE PAYMENT",
    info: "100% secure payment",
    img: "/images/services/3.png",
  },
  {
    title: "24/7 SUPPORT",
    info: "Dedicated support",
    img: "/images/services/4.png",
  },
];

const Services: React.FC = ({}) => {
  return (
    <section className={`${style.services}`}>
      {servicesList.map((el: any) => (
        <article className={`${style.service}`}>
          <Image src={el.img} alt="service" width={30} height={30} />
          <h3>{el.title}</h3>
          <p>{el.info}</p>
        </article>
      ))}
    </section>
  );
};

export default Services;
