"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface imageProps {
  images: string[];
}

import { FreeMode, Thumbs, Zoom } from "swiper/modules";

const ProductImageGallery: React.FC<imageProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleThumbsSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  };

  return (
    <div className={`${style.gallery} `}>
      <Swiper
        // style={}
        spaceBetween={10}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Zoom]}
        className="mySwiper2"
      >
        {images.map((el: any, id: number) => (
          <SwiperSlide key={id}>
            <div className={`swiper-zoom-container ${style.bigImage}`}>
              <Image src={el} alt="img" width={400} height={400} />
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
        {images.map((el: any, id: number) => (
          <SwiperSlide key={id}>
            <Image src={el} alt="img" width={130} height={120} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
