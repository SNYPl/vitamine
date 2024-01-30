import React from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Socials from "../header/topNav/socials/Socials";
import FooterLink from "./links/footerLink";

const company = ["/images/companies/1.png", "/images/companies/2.png"];

const Footer: React.FC = ({}) => {
  return (
    <section className={`${style.footer}`}>
      <article className={`${style.footerInfoItem}`}>
        <Image src={"/images/logo.png"} alt="logo" width={93} height={37} />
        <ul className={`${style.footerList}`}>
          <li>Address: 60-49 Road 11378 New York</li>
          <li>Phone: +65 11.188.888</li>
          <li>Email: info.deercreative@gmail.com</li>
        </ul>
        <Socials />
      </article>

      <FooterLink />
    </section>
  );
};

export default Footer;
