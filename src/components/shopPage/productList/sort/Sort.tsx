"use client";
import React from "react";
import style from "./style.module.scss";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import {
  setShowProductNumber,
  setSortingValue,
} from "@/store/slices/paginationSlice";
import { SortAscendingOutlined } from "@ant-design/icons";
// import { setShopPage } from "@/store/slices/paginationSlice";

const Sort: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { Option } = Select;

  const onShowSelectChange = (e: any) => {
    // const firstPage = 1;
    const showValue = +e;
    dispatch(setShowProductNumber(showValue));
    // dispatch(setShopPage(firstPage));
  };

  const onSortSelectChange = (e: any) => {
    const value = e;
    dispatch(setSortingValue(value));
  };

  return (
    <section className={style.sort}>
      <div className={style.sortHeader}>
        <SortAscendingOutlined className={style.sortIcon} />
        <h3>სორტირება</h3>
      </div>
      
      <div className={style.sortSelects}>
        <div className={style.selectWrapper}>
          <label>დაასორტირე:</label>
          <Select
            defaultValue="default"
            className={style.sortSelect}
            onChange={onSortSelectChange}
            dropdownClassName={style.dropdown}
          >
            <Option value="default">Default</Option>
            <Option value="lowHight">ფასი: ზრდადი</Option>
            <Option value="highLow">ფასი: კლებადი</Option>
            <Option value="review">მიმოხილვა</Option>
            <Option value="rating">რეიტინგი</Option>
          </Select>
        </div>
        
        <div className={style.selectWrapper}>
          <label>მანახე:</label>
          <Select
            defaultValue="12"
            className={style.sortSelect}
            onChange={onShowSelectChange}
            dropdownClassName={style.dropdown}
          >
            <Option value="12">12 ცალი</Option>
            <Option value="21">21 ცალი</Option>
            <Option value="30">30 ცალი</Option>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default Sort;
