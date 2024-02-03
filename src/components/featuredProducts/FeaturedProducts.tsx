"use client";

import React, { useState } from "react";
import style from "./style.module.scss";
import FeaturedMenu from "./featuredMenu/FeaturedMenu";
import Product from "./product/Product";

interface FeaturedProduct {
  category: string;
  description: string;
  img: string;
  price: string;
  sale?: string;
}

const featuredProducts = [
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/1.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    category: "Bread",
    description: "Green Chrusanthemum",
    img: "/images/featured/2.png",
    price: "$5.5",
    sale: "",
  },
  {
    category: "Bread",
    description: "Mustard Australia",
    img: "/images/featured/3.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/4.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/5.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/6.png",
    price: "6.5$",
    sale: "",
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/7.png",
    price: "6.5$",
    sale: "",
  },
  {
    category: "Bread",
    description: "Fresh orange",
    img: "/images/featured/8.png",
    price: "2.5$",
    sale: "",
  },
];

const FeaturedProducts: React.FC = ({}) => {
  const [activeMenu, setActiveMenu] = useState("all");
  return (
    <section className={`${style.featured}`}>
      <article className={`${style.title}`}>
        <h2>Featured products</h2>
        <div></div>
      </article>
      <FeaturedMenu setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
      <section className={`${style.featuredProductsList}`}>
        {featuredProducts.map((el: FeaturedProduct, id: any) => (
          <Product {...el} key={id} id={id} />
        ))}
      </section>
    </section>
  );
};

export default FeaturedProducts;
