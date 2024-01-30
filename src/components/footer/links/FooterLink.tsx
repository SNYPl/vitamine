import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

const Footer: React.FC = ({}) => {
  const links = [
    { title: "About us", value: "about" },
    { title: "Check us", value: "check" },
    { title: "Contact us", value: "contact" },
    { title: "Service us", value: "service" },
  ];

  return (
    <article className={`${style.links}`}>
      <h3>Information</h3>

      <ul>
        {links.map((el: any, id: number) => (
          <li key={id}>
            <Link href={"#"}>{el.title}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Footer;
