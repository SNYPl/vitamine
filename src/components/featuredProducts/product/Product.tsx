import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";

interface product {
  category?: string;
  description: string;
  img: string;
  price: string;
  sale?: string;
  introduction?: boolean;
}

const Product: React.FC<product> = ({
  category,
  description,
  img,
  price,
  sale,
  introduction,
}) => {
  return (
    <article
      className={`${style.product} ${introduction ? style.introduction : ""}`}
    >
      <div className={`${style.productImg}`}>
        <Image
          src={img}
          alt="item"
          width={introduction ? 70 : 210}
          height={introduction ? 70 : 138}
        />
      </div>
      <div className={`${style.productInfo}`}>
        <h3>{category}</h3>
        <Link href={"#"}>{description}</Link>
        <h4>
          {sale ? sale : price} <del> {sale ? price : null}</del>
        </h4>
      </div>
    </article>
  );
};

export default Product;
