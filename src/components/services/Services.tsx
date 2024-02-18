import React from "react";
import style from "./style.module.scss";
import Image from "next/image";

const servicesList = [
  {
    title: "უფასო მიტანა",
    info: " უფასო მიტანა თბილისში - 100 ლარის ზემოთ",
    img: "/images/services/1.png",
  },
  {
    title: "სწრაფი მიტანის სერვისი",
    info: "",
    img: "/images/services/2.png",
  },
  {
    title: "თანხის გადახდა ადგილზე",
    info: "მარტივად და სწრაფად",
    img: "/images/services/3.png",
  },
  {
    title: "24/7 საფორთი",
    info: "მოგვწერეთ როცა გინდათ",
    img: "/images/services/4.png",
  },
];

const Services: React.FC = ({}) => {
  return (
    <section className={`${style.services}`}>
      {servicesList.map((el: any, id: any) => (
        <article className={`${style.service}`} key={id}>
          <Image src={el.img} alt="service" width={30} height={30} />
          <h3>{el.title}</h3>
          <p>{el.info}</p>
        </article>
      ))}
    </section>
  );
};

export default Services;
