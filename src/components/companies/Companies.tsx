import React from "react";
import style from "./style.module.scss";
import Image from "next/image";

const company = ["/images/companies/1.png", "/images/companies/2.png"];

const Companies: React.FC = ({}) => {
  return (
    <section className={`${style.companies}`}>
      {company.map((el: any, id: any) => (
        <div key={id}>
          <Image src={el} alt="img" width={65} height={55} />
        </div>
      ))}
    </section>
  );
};

export default Companies;
