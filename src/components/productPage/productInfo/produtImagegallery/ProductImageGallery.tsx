"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/navigation";

interface imageProps {
  images: string[];
  country: string;
  sold: number;
  productQuantity: number;
}

import { FreeMode, Thumbs, Zoom, Navigation } from "swiper/modules";

const ProductImageGallery: React.FC<imageProps> = ({
  images,
  country,
  sold,
  productQuantity,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleThumbsSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  };

  return (
    <div className={`${style.gallery}`}>
      <div className={style.badgeContainer}>
        {country === "usa" && (
          <div className={style.countryBadge}>
            <Image
              src={"/images/product/usa1.jfif"}
              alt="flag"
              width={55}
              height={55}
              className={style.detailsCountryFlag}
            />
            <span>Made in USA</span>
          </div>
        )}

        {!productQuantity && (
          <div className={style.soldOutBadge}>
            <Image
              src={"/images/product/soldOut.png"}
              alt="flag"
              width={100}
              height={100}
              className={style.soldOutImg}
            />
          </div>
        )}
      </div>

      <Swiper
        spaceBetween={10}
        zoom={true}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Zoom, Navigation]}
        className={`mySwiper2 ${style.mainSwiper}`}
      >
        {images?.map((el: any, id: number) => (
          <SwiperSlide key={id}>
            <div className={`swiper-zoom-container ${style.bigImage}`}>
              <Image 
                src={el} 
                alt="product image" 
                width={400} 
                height={400}
                className={style.productImage} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={handleThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Zoom]}
        className={`mySwiper ${style.thumbNails}`}
      >
        {images?.map((el: any, id: number) => (
          <SwiperSlide key={id} className={style.thumbnailSlide}>
            <Image 
              src={el} 
              alt="product thumbnail" 
              width={130} 
              height={120} 
              className={style.thumbnailImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
