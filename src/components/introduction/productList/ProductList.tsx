"use client";

import React, { useRef, RefObject } from "react";
import style from "./style.module.scss";
import Product from "@/components/product/Product";
import { Button } from "antd";
import Slider from "react-slick";

interface props {
  title: string;
  products: Array<{
    category?: string;
    name: string;
    mainImage: string;
    price: string;
    discount?: number;
    introduction?: boolean;
    _id: number;
    country: string;
    sold: number;
  }>;
}

const ProductList: React.FC<props> = ({ title, products = [] }) => {
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
        <h5>{title}</h5>
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
          {products?.map((item, index) => (
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
