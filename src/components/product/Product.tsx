import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import { Button } from "antd";
import { formatCurrency } from "@/common/utils";

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
        <Image
          src={"/images/product/usa.jfif"}
          alt="flag"
          width={32}
          height={32}
        />
      </div>
      <div className={`${style.productImg}`}>
        <Image
          src={"/images/product/usa.jfif"}
          alt="flag"
          width={15}
          height={15}
          className={style.introductionCountryFlag}
        />

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
        <Button
          // onClick={() => onAddWishlist(data)}
          className={`product-btn ${style.productBtn} `}
          type="primary"
          shape="round"
          icon={<i className="far fa-heart" />}
        />
        <Button
          // onClick={() => onAddToCart(data)}
          className={`product-btn ${style.productBtn} `}
          type="primary"
          shape="round"
          icon={
            // addToCartLoading ? (
            //   <LoadingOutlined spin />
            // ) : (
            <i className="fa-solid fa-bag-shopping" />
            // )
          }
        />

        <Button
          // onClick={showModal}
          className={`product-btn ${style.productBtn} `}
          type="primary"
          shape="round"
          icon={<i className="far fa-eye" />}
        />
      </div>
    </article>
  );
};

export default Product;
