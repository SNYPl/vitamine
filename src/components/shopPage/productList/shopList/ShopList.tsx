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
import NoProduct from "@/components/emptyProduct/noProduct";

const ShopList = ({
  userWishlist,
}: {
  userWishlist: [string] | undefined | null;
}) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pageCount = useSelector((state: any) => state.products.shopPageValue);
  const searchValue = searchParams?.get("search");
  const showProductNumber = useSelector(
    (state: any) => state.products.showProductNumber
  );
  const sortingValue = useSelector((state: any) => state.products.sortingValue);

  const categoryList = searchParams?.get("category");

  const priceRange = useSelector((state: any) => state.priceFilter.priceFilter);
  const [min, max] = priceRange;

  const { data, isLoading, isError } = useQuery(
    [
      "getSupplementByCategory",
      categoryList,
      pageCount,
      searchValue,
      priceRange,
      showProductNumber,
      sortingValue,
    ],
    async () => {
      try {
        const response = await axios.get("/api/withCategory/get", {
          params: {
            category: categoryList,
            page: pageCount,
            search: searchValue,
            min,
            max,
            limit: showProductNumber,
            sort: sortingValue,
          },
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
      dispatch(setProductList(data?.total));
    }
  }, [data]);

  const quantityTrue = data?.allVitamines.filter(
    (el: any) => el.productQuantity
  );
  const quantityFalse = data?.allVitamines.filter(
    (el: any) => el.productQuantity === 0
  );

  const allVitamines = quantityTrue?.concat(quantityFalse);

  if (isLoading)
    return (
      <div className={style.skeletonGrid}>
        {[...Array(6)].map((_, i) => (
          <div className={style.skeletonItem} key={i}>
            <Skeleton active />
          </div>
        ))}
      </div>
    );

  if (!allVitamines || !allVitamines.length) {
    return <NoProduct title={"No products found matching your criteria"} />;
  }

  return (
    <section className={style.productGrid}>
      {allVitamines?.map((item: any) => (
        <Product {...item} key={item._id} userWishlist={userWishlist} />
      ))}
    </section>
  );
};

export default ShopList;
