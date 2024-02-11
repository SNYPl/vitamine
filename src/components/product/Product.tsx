import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import { Button } from "antd";
import { formatCurrency } from "@/common/utils";
import ProductButtons from "./productButtons/ProductButtons";

interface product {
  category?: string;
  name: string;
  mainImage: string;
  price: string;
  discount?: number;
  introduction?: boolean;
  _id: number;
  country: string;
}

const Product: React.FC<product> = ({
  category,
  name,
  mainImage,
  price,
  discount,
  introduction,
  _id,
  country,
}) => {
  return (
    <article
      className={`${style.product} ${
        introduction ? style.introduction : style.nonIntroduction
      }`}
    >
      <div className={`${style.countryFlag}`}>
        {country === "usa" && (
          <Image
            src={"/images/product/usa1.jfif"}
            alt="flag"
            width={55}
            height={55}
          />
        )}
      </div>
      <div className={`${style.productImg}`}>
        {country === "usa" && (
          <Image
            src={"/images/product/usa1.jfif"}
            alt="flag"
            width={17}
            height={17}
            className={style.introductionCountryFlag}
          />
        )}

        <Link href={`/shop/product?id=${_id}`} className={`${style.imgLink}`}>
          <Image
            src={mainImage}
            alt="img"
            width={introduction ? 70 : 210}
            height={introduction ? 70 : 138}
          />
        </Link>
      </div>
      <div className={`${style.productInfo}`}>
        <h3>{category}</h3>
        <Link
          href={`/shop/product?id=${_id}`}
          className={`${style.productNameLink}`}
        >
          {name}
        </Link>
        <h4>
          {discount ? formatCurrency(discount) : formatCurrency(price)}
          <del>{discount ? formatCurrency(price) : null}</del>
        </h4>
      </div>
      <div className={`${style.cartButtons}`}>
        <ProductButtons id={_id} key={_id} />
      </div>
    </article>
  );
};

export default Product;
