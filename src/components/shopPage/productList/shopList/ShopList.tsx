import React from "react";
import style from "./style.module.scss";
import Product from "@/components/featuredProducts/product/Product";

const featuredProducts = [
  {
    description: "Fresh orange",
    img: "/images/featured/1.png",
    price: "6.5$",
    sale: "5.5$",
    id: Math.random() + Date.now() + 1,
  },
  {
    description: "Green Chrusanthemum",
    img: "/images/featured/2.png",
    price: "$5.5",
    sale: "",
    id: Math.random() + Date.now() + 2,
  },
  {
    description: "Mustard Australia",
    img: "/images/featured/3.png",
    price: "6.5$",
    sale: "5.5$",
    id: Math.random() + Date.now() + 3,
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/4.png",
    price: "6.5$",
    sale: "5.5$",
    id: Math.random() + Date.now() + 4,
  },
  {
    description: "Fresh orange",
    img: "/images/featured/5.png",
    price: "6.5$",
    sale: "5.5$",
    id: Math.random() + Date.now() + 5,
  },
  {
    description: "Fresh orange",
    img: "/images/featured/6.png",
    price: "6.5$",
    sale: "",
    id: Math.random() + Date.now() + 6,
  },
  {
    description: "Fresh orange",
    img: "/images/featured/7.png",
    price: "6.5$",
    sale: "",
    id: Math.random() + Date.now() + 7,
  },
  {
    description: "Fresh orange",
    img: "/images/featured/8.png",
    price: "2.5$",
    sale: "",
    id: Math.random() + Date.now() + 8,
  },
];

const ShopList: React.FC = ({}) => {
  return (
    <section className={`${style.shopList}`}>
      {featuredProducts.map((item, index) => (
        <Product {...item} key={index} />
      ))}
    </section>
  );
};

export default ShopList;
