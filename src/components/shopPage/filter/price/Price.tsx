"use client";
import React, { useState } from "react";
import Slider from "rc-slider";
import style from "./style.module.scss";
import "rc-slider/assets/index.css";
import Button from "@/components/button/Button";
import { useDispatch } from "react-redux";
import { setPriceFilter } from "@/store/slices/priceSlice";

const Price: React.FC = ({}) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const minValue = 0;
  const maxValue = 500;
  const dispatch = useDispatch();

  const handleSliderChange = (values: any) => {
    setPriceRange(values);
  };

  const filterButtonhandler = () => {
    dispatch(setPriceFilter(priceRange));
  };

  return (
    <article className={`${style.price}`}>
      <h3>ფასით გაფილტვრა</h3>
      <Slider
        range
        min={minValue}
        max={maxValue}
        defaultValue={[minValue, maxValue]}
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
        <Button onSubmitButton={filterButtonhandler}>გაფილტვრა</Button>
      </div>
    </article>
  );
};

export default Price;
