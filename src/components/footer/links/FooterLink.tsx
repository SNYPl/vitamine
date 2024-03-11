import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = ({}) => {
  const links = [
    { title: "შეთავაზებები", value: "/shop" },
    { title: "ჩვენს შესახებ", value: "/about" },
    { title: "კონტაქტი", value: "/contact" },
    // { title: "Service us", value: "service" },
  ];

  return (
    <article className={`${style.links}`}>
      <h3>ინფორმაცია</h3>

      <ul>
        {links.map((el: any, id: number) => (
          <li key={id}>
            <Link href={el.value}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Footer;
