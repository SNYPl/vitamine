import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import { Button } from "antd";

interface product {
  category?: string;
  description: string;
  img: string;
  price: string;
  sale?: string;
  introduction?: boolean;
  id: number;
}

const Product: React.FC<product> = ({
  category,
  description,
  img,
  price,
  sale,
  introduction,
  id,
}) => {
  return (
    <article
      className={`${style.product} ${
        introduction ? style.introduction : style.nonIntroduction
      }`}
    >
      <div className={`${style.productImg}`}>
        <Link href={`/shop/${id}`} className={`${style.imgLink}`}>
          <Image
            src={img}
            alt="item"
            width={introduction ? 70 : 210}
            height={introduction ? 70 : 138}
          />
        </Link>
      </div>
      <div className={`${style.productInfo}`}>
        <h3>{category}</h3>
        <Link href={`/shop/${id}`} className={`${style.productNameLink}`}>
          {description}
        </Link>
        <h4>
          {sale ? sale : price} <del> {sale ? price : null}</del>
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
