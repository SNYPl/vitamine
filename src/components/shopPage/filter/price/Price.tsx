"use client";
import React, { useState } from "react";
import Slider from "rc-slider";
import style from "./style.module.scss";
import "rc-slider/assets/index.css";
import Button from "@/components/button/Button";

const Price: React.FC = ({}) => {
  const [priceRange, setPriceRange] = useState([0, 500]);

  const handleSliderChange = (values: any) => {
    setPriceRange(values);
  };
  return (
    <article className={`${style.price}`}>
      <h3>ფასით გაფილტვრა</h3>
      <Slider
        range
        min={0}
        max={500}
        defaultValue={[0, 500]}
        value={priceRange}
        onChange={handleSliderChange}
      />
      <div className={`${style.range}`}>
        <h4>
          ფასი:
          <span>
            {priceRange[0]}
            <h5>₾</h5> - {priceRange[1]}
            <h5>₾</h5>
          </span>
        </h4>
        <Button>გაფილტვრა</Button>
      </div>
    </article>
  );
};

export default Price;
