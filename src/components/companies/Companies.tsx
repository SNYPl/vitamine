import React from "react";
import style from "./style.module.scss";
import Image from "next/image";

const company = [
  "/images/companies/1.png",
  "/images/companies/3.png",
  "/images/companies/4.png",
  "/images/companies/5.png",
  "/images/companies/6.png",
];

const Companies: React.FC = ({}) => {
  return (
    <section className={style.companiesSection}>
      <div className={style.companiesContainer}>
        <div className={style.companiesHeader}>
          <h2>Our Trusted Partners</h2>
          <p>We collaborate with leading companies in the wellness industry to deliver premium products</p>
        </div>
        
        <div className={style.companiesGrid}>
          {company.map((el: string, id: number) => (
            <div key={id} className={style.companyItem}>
              <div className={style.companyLogo}>
                <Image
                  src={el}
                  alt={`Partner Company ${id + 1}`}
                  width={100}
                  height={80}
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
