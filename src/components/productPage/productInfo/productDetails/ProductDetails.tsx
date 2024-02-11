import React from "react";
import style from "./style.module.scss";
import { Rate } from "antd";
import Button from "@/components/button/Button";
import Quantity from "./quantityInput/Quantity";
import { formatCurrency } from "@/common/utils";

interface detailProps {
  category: string;
  name: string;
  infoTitle: string;
  price: number;
  discount: number;
  rating: number;
  productQuantity: number;
  packageQuantity: number;
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
}) => {
  return (
    <article className={`${style.details}`}>
      <h4 className={style.category}>{category}</h4>
      <h3 className={style.title}>{name}</h3>
      <p className={style.info}>{infoTitle}</p>
      <p className={style.packageQuantity}>
        <span>რაოდენობა:</span> {packageQuantity} აბი
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
          <Rate allowHalf defaultValue={rating} />
        </div>
      </div>
      <div className={style.quanty}>
        <Quantity productQuantity={productQuantity} />
        <p
          style={{ color: productQuantity ? "#4eb016" : "#B50808" }}
          className={style.stockParagraph}
        >
          {productQuantity ? (
            <span>
              <i className="fa-solid fa-check"></i> მარაგში
            </span>
          ) : (
            "მარაგი ამოიწურა"
          )}
        </p>
      </div>
      <Button className={style.button} disabled={true}>
        კალათაში დამატება
      </Button>
    </article>
  );
};

export default ProductDetails;
