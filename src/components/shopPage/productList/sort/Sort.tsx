"use client";
import React from "react";
import style from "./style.module.scss";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowProductNumber,
  setSortingValue,
} from "@/store/slices/paginationSlice";

const Sort: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { Option } = Select;

  const onShowSelectChange = (e: any) => {
    const showValue = +e;
    dispatch(setShowProductNumber(showValue));
  };

  const onSortSelectChange = (e: any) => {
    const value = e;
    dispatch(setSortingValue(value));
  };

  return (
    <section className={`${style.sort}`}>
      <Select
        defaultValue="დახარისხება"
        style={{ width: "47%" }}
        onChange={onSortSelectChange}
      >
        <Option value="default">სტანდარტული</Option>
        <Option value="lowHight">ფასი: ზრდადობით</Option>
        <Option value="highLow">ფასი: კლებით</Option>
        {/* <Option value="review">მიმოხილვით</Option>
        <Option value="rating">რეიტინგით</Option> */}
      </Select>
      <Select
        defaultValue="მაჩვენე 12"
        style={{ width: "47%" }}
        onChange={onShowSelectChange}
      >
        <Option value="12">მაჩვენე 12</Option>
        <Option value="21">მაჩვენე 21</Option>
        <Option value="30">მაჩვენე 30</Option>
      </Select>
    </section>
  );
};

export default Sort;
