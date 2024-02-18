import React from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Socials from "../header/topNav/socials/Socials";
import FooterLink from "./links/FooterLink";

const Footer: React.FC = ({}) => {
  return (
    <section className={`${style.footer}`}>
      <article className={`${style.footerInfoItem}`}>
        <Image
          src={"/images/vitvitLogo.jpg"}
          alt="logo"
          width={110}
          height={70}
        />
        <ul className={`${style.footerList}`}>
          <li>მისამართი: თბილისი,</li>
          <li>ტელეფონი: +995 557 00 76 37</li>
          <li>ელ.ფოსტა: vitamine.vitvit@gmail.com</li>
        </ul>
        <Socials />
      </article>

      <FooterLink />
    </section>
  );
};

export default Footer;
