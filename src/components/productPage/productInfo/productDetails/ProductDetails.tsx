import React from "react";
import style from "./style.module.scss";
import { Rate } from "antd";
import Quantity from "./quantityInput/Quantity";
import { formatCurrency } from "@/common/utils";

interface detailProps {
  category: string[];
  name: string;
  infoTitle: string;
  price: number;
  discount: number;
  rating: number[];
  productQuantity: number;
  packageQuantity: string;
  id: string;
  sold: number;
}

const ProductDetails: React.FC<detailProps> = ({
  category,
  name,
  infoTitle,
  price,
  discount,
  rating,
  productQuantity,
  packageQuantity,
  id,
  sold,
}) => {
  const categoryString = category?.join("/");
  const ratingLength = rating?.length;

  const averageRating =
    rating.reduce((acc, curr) => acc + curr, 0) / ratingLength;

  const boundedRating = Math.min(averageRating, 5);

  return (
    <article className={`${style.details}`}>
      <h4 className={style.category}>{categoryString}</h4>
      <h3 className={style.title}>{name}</h3>
      <p className={style.info}>{infoTitle}</p>
      <p className={style.packageQuantity}>
        <span>რაოდენობა:</span> {packageQuantity}
      </p>
      <div className={style.deliveryInfo}>
        უფასო მიტანა თბილისში - 100 ლარის ზემოთ
      </div>
      <div className={style.priceInfo}>
        <del>{discount ? formatCurrency(price) : null}</del>
        <div className={style.Star}>
          <h3>
            {discount ? formatCurrency(discount) : formatCurrency(price)}{" "}
          </h3>
          <Rate allowHalf disabled value={boundedRating} />{" "}
          {ratingLength ? (
            <span className={style.ratingNumber}>{`(${ratingLength})`}</span>
          ) : (
            ""
          )}
        </div>
      </div>

      <Quantity productQuantity={productQuantity} id={id} sold={sold} />
    </article>
  );
};

export default ProductDetails;
