"use client";
import React from "react";
import style from "./style.module.scss";
import Product from "@/components/product/Product";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "@/store/slices/paginationSlice";
import { Skeleton } from "antd";

const ShopList: React.FC = ({}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pageCount = useSelector((state: any) => state.products.shopPageValue);

  const categoryList = searchParams.get("category");

  const { data, isLoading, isError } = useQuery(
    ["getSupplementByCategory", categoryList, pageCount],
    async () => {
      try {
        const response = await axios.get("/api/withCategory/get", {
          params: { category: categoryList, page: pageCount },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  React.useEffect(() => {
    if (data) {
      dispatch(setProductList(data));
    }
  }, [data]);

  if (isLoading)
    return (
      <article className={`${style.skeletion} `}>
        <Skeleton />
      </article>
    );

  return (
    <section className={`${style.shopList}`}>
      {data?.map((item: any) => (
        <Product {...item} key={item._id} />
      ))}
    </section>
  );
};

export default ShopList;
