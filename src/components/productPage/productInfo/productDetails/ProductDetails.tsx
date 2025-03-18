import React from "react";
import style from "./style.module.scss";
import { Rate, Badge, Tag } from "antd";
import Quantity from "./quantityInput/Quantity";
import { formatCurrency } from "@/common/utils";
import { categories } from "@/data/categories.js";

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
  const ratingLength = rating?.length;

  const averageRating =
    rating?.reduce((acc, curr) => acc + curr, 0) / ratingLength;

  const boundedRating = Math.min(averageRating, 5);
  
  const discountPercentage = discount ? Math.round((1 - discount / price) * 100) : 0;

  const findGeorgianCategoryName = (englishName: string) => {
    const categoryItem = categories.find(cat => cat.value === englishName);
    return categoryItem?.name || englishName;
  };

  return (
    <article className={`${style.details}`}>
      <div className={style.header}>
        <div className={style.categoryWrapper}>
          {category?.map((cat, index) => (
            <Tag key={index} className={style.categoryTag}>
              {findGeorgianCategoryName(cat)}
            </Tag>
          ))}
        </div>
        <h1 className={style.title}>{name}</h1>
        <p className={style.info}>{infoTitle}</p>
      </div>
      
      <div className={style.ratingContainer}>
        <Rate allowHalf disabled value={boundedRating} className={style.stars} /> 
        <span className={style.ratingNumber}>
          {boundedRating ? boundedRating.toFixed(1) : null} {ratingLength ? `(${ratingLength} შეფასება)` : 0}
        </span>
        {sold > 0 && (
          <span className={style.soldCount}>{sold} გაყიდული</span>
        )}
      </div>
      
      <div className={style.priceSection}>
        {discount ? (
          <div className={style.discountContainer}>
            <span className={style.originalPrice}>{formatCurrency(price)}</span>
            <Badge count={`-${discountPercentage}%`} className={style.discountBadge} />
          </div>
        ) : null}
        
        <div className={style.currentPrice}>
          <h2>{discount ? formatCurrency(discount) : formatCurrency(price)}</h2>
        </div>
      </div>
      
      <div className={style.infoSection}>
        <div className={style.packageInfo}>
          <span className={style.infoLabel}>რაოდენობა:</span>
          <span className={style.packageQuantity}>{packageQuantity}</span>
        </div>
        
        <div className={style.availabilityInfo}>
          <span className={style.infoLabel}>მარაგშია:</span>
          <span className={productQuantity > 0 ? style.inStock : style.outOfStock}>
            {productQuantity > 0 ? `${productQuantity} ერთეული` : "არ არის მარაგში"}
          </span>
        </div>
      </div>
      
      <div className={style.deliveryInfo}>
        <div className={style.deliveryIcon}>🚚</div>
        <p>უფასო მიტანა თბილისში - 100 ლარის ზემოთ</p>
      </div>
      
      <div className={style.divider}></div>
      
      <Quantity productQuantity={productQuantity} id={id} sold={sold} />
    </article>
  );
};

export default ProductDetails;
