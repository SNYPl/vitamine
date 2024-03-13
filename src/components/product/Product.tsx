import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
import Link from "next/link";
import { formatCurrencyWithSymbol } from "@/common/utils";
import ProductButtons from "./productButtons/ProductButtons";

interface product {
  category?: string[];
  name: string;
  mainImage: string;
  price: string;
  discount?: number;
  introduction?: boolean;
  _id: number;
  country: string;
  productQuantity?: number | undefined | any;
  sold: number;
  userWishlist?: [string] | null | undefined;
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
  productQuantity,
  sold,
  userWishlist,
}) => {
  const categoryString = category?.join("/");
  const id = _id.toString();
  const isWishlisted = userWishlist?.includes(id);

  return (
    <article
      className={`${style.product} ${
        introduction ? style.introduction : style.nonIntroduction
      }`}
    >
      {!productQuantity ? (
        <Image
          src={"/images/product/soldOut.png"}
          alt="flag"
          width={introduction ? 35 : 55}
          height={introduction ? 35 : 55}
          className={style.soldOutImg}
        />
      ) : (
        ""
      )}
      <div className={`${style.productImg}`}>
        <Link href={`product?id=${_id}`} className={`${style.imgLink}`}>
          <Image
            src={mainImage}
            alt="img"
            width={introduction ? 70 : 210}
            height={introduction ? 70 : 138}
          />
          {country === "usa" && (
            <Image
              src={"/images/product/usa1.jfif"}
              alt="flag"
              width={introduction ? 17 : 55}
              height={introduction ? 17 : 55}
              className={style.CountryFlag}
            />
          )}
        </Link>
      </div>
      <div className={`${style.productInfo}`}>
        <h3>{categoryString}</h3>
        <Link href={`product?id=${_id}`} className={`${style.productNameLink}`}>
          {name}
        </Link>
        <h4>
          {discount
            ? formatCurrencyWithSymbol(discount)
            : formatCurrencyWithSymbol(price)}
          <del>{discount ? formatCurrencyWithSymbol(price) : null}</del>
        </h4>
      </div>

      {!introduction && (
        <div className={`${style.cartButtons}`}>
          <ProductButtons
            id={_id}
            key={_id}
            productQuantity={productQuantity}
            isWishlisted={isWishlisted}
          />
        </div>
      )}
    </article>
  );
};

export default Product;
