"use client";

import React, { useRef, RefObject } from "react";
import style from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import Product from "@/components/featuredProducts/product/Product";
import { Button } from "antd";
import Slider from "react-slick";

const featuredProducts = [
  {
    description: "Fresh orange",
    img: "/images/featured/1.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    description: "Green Chrusanthemum",
    img: "/images/featured/2.png",
    price: "$5.5",
    sale: "",
  },
  {
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
    description: "Fresh orange",
    img: "/images/featured/5.png",
    price: "6.5$",
    sale: "5.5$",
  },
  {
    description: "Fresh orange",
    img: "/images/featured/6.png",
    price: "6.5$",
    sale: "",
  },
  {
    description: "Fresh orange",
    img: "/images/featured/7.png",
    price: "6.5$",
    sale: "",
  },
  {
    description: "Fresh orange",
    img: "/images/featured/8.png",
    price: "2.5$",
    sale: "",
  },
];

interface props {
  rows?: boolean;
}

const ProductList: React.FC<props> = ({ rows }) => {
  const sliderSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rows: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const sliderRef: RefObject<Slider> = useRef<Slider>(null);
  return (
    <div className={`${style.productSlide}`}>
      <div className={`${style.productSlideHeader}`}>
        <h5>Dale of the week</h5>
        <div className={style.controller}>
          <Button
            type="primary"
            icon={<i className="fa-solid fa-chevron-left"></i>}
            onClick={() => sliderRef.current?.slickPrev()}
          />
          <Button
            type="primary"
            icon={<i className="fa-solid fa-chevron-right"></i>}
            onClick={() => sliderRef.current?.slickNext()}
          />
        </div>
      </div>
      <div className={`${style.content}`}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {featuredProducts.map((item, index) => (
            <div className={style.slideItem} key={index}>
              <Product {...item} key={index} introduction />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
