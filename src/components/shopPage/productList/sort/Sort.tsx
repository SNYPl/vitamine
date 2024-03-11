"use client";
import React from "react";
import style from "./style.module.scss";
import { Select } from "antd";

const Sort: React.FC = ({}) => {
  const { Option } = Select;
  return (
    <section className={`${style.sort}`}>
      <Select
        defaultValue=""
        style={{ width: "47%" }}
        // onChange={onSortSelectChange}
      >
        <Option value="">Default</Option>
        <Option value="az">A to Z</Option>
        <Option value="za">Z to A</Option>
        <Option value="highLow">High to low price</Option>
        <Option value="lowHight">Low to high price</Option>
      </Select>
      <Select
        defaultValue="10"
        style={{ width: "47%" }}
        // onChange={onShowSelectChange}
      >
        <Option value="10">Show 10</Option>
        <Option value="15">Show 15</Option>
        <Option value="20">Show 20</Option>
      </Select>
    </section>
  );
};

export default Sort;
