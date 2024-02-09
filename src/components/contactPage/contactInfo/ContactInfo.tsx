import React from "react";
import style from "./style.module.scss";
import Link from "next/link";

const ContactInfo: React.FC = ({}) => {
  return (
    <div className={`${style.contactInfo}`}>
      <article className={style.infoItem}>
        <i className="fa-solid fa-location-dot"></i>
        <p className={style.infoItemMessage}>
          მოგვწერეთ <Link href={"#"}>Facebook</Link>-ზე
        </p>
      </article>
      <article className={style.infoItem}>
        <i className="fa-regular fa-envelope"></i>
        <p className={style.infoItemParagraph}>
          <span>ტელეფონი: </span> +995 557 00 76 37
        </p>
        <p className={style.infoItemParagraph}>
          <span>ელ.ფოსტა: </span> vitamine.vitvit@gmail.com
        </p>
      </article>

      <article className={style.infoItem}>
        <i className="fa-regular fa-clock"></i>
        <p className={style.infoItemParagraph}>
          <span>ყოველდღე: </span> 11:00 - 24:00
        </p>
      </article>
    </div>
  );
};

export default ContactInfo;
