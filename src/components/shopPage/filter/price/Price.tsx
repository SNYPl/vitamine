"use client";
import React, { useState, useEffect } from "react";
import { Slider, InputNumber, Row, Col, Button } from "antd";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter } from "@/store/slices/priceSlice";

const PriceFilter: React.FC = () => {
  const dispatch = useDispatch();
  const reduxPriceRange = useSelector((state: any) => state.priceFilter.priceFilter);
  
  // Initialize state from Redux to maintain consistency
  const [priceRange, setPriceRange] = useState<[number, number]>(reduxPriceRange);
  const [minInput, setMinInput] = useState<number>(reduxPriceRange[0]);
  const [maxInput, setMaxInput] = useState<number>(reduxPriceRange[1]);
  
  // Sync with Redux state if it changes externally
  useEffect(() => {
    setPriceRange(reduxPriceRange);
    setMinInput(reduxPriceRange[0]);
    setMaxInput(reduxPriceRange[1]);
  }, [reduxPriceRange]);
  
  // Update the slider when inputs change
  useEffect(() => {
    setPriceRange([minInput, maxInput]);
  }, [minInput, maxInput]);

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    // Cast to specific range values
    const newRange: [number, number] = [values[0], values[1]];
    setPriceRange(newRange);
    setMinInput(values[0]);
    setMaxInput(values[1]);
  };

  // Apply button handler
  const handleApply = () => {
    // Make sure we're filtering with the current UI values
    const filterRange: [number, number] = [minInput, maxInput];
    dispatch(setPriceFilter(filterRange));
  };

  // Reset button handler
  const handleReset = () => {
    const defaultRange: [number, number] = [0, 500];
    setPriceRange(defaultRange);
    setMinInput(0);
    setMaxInput(500);
    dispatch(setPriceFilter(defaultRange));
  };

  // Remove console.log in production
  // console.log(priceRange);

  return (
    <div className={style.priceFilterContainer}>
      <Slider
        range
        min={0}
        max={500}
        value={priceRange}
        onChange={handleSliderChange}
        className={style.priceSlider}
        tooltip={{ formatter: (value) => `₾${value}` }}
      />
      
      <div className={style.inputsRow}>
        <Row gutter={8} align="middle">
          <Col span={10}>
            <InputNumber
              min={0}
              max={maxInput}
              value={minInput}
              onChange={(value) => setMinInput(Number(value) || 0)}
              className={style.priceInput}
              prefix="₾"
              controls={false}
            />
          </Col>
          <Col span={4} className={style.rangeDivider}>
            <span>-</span>
          </Col>
          <Col span={10}>
            <InputNumber
              min={minInput}
              max={500}
              value={maxInput}
              onChange={(value) => setMaxInput(Number(value) || 0)}
              className={style.priceInput}
              prefix="₾"
              controls={false}
            />
          </Col>
        </Row>
      </div>
      
      <div className={style.buttonGroup}>
        <Button 
          type="primary" 
          onClick={handleApply}
          className={style.applyButton}
        >
          გაფილტვრა
        </Button>
        <Button 
          onClick={handleReset}
          className={style.resetButton}
        >
          გასუფთავება
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
