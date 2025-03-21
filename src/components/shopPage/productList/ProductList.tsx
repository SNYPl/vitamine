import React from "react";
import style from "./style.module.scss";
import Sort from "./sort/Sort";
import ShopList from "./shopList/ShopList";
import PaginationComponent from "./pagination/Pagination";
import FeaturedList from "../featuredList/FeaturedList";
import { getAllWishListProductsIds } from "@/lib/wishlist";

const ProductList: React.FC = async ({}) => {
  const productIds = await getAllWishListProductsIds();

  // Pass the full array of wishlist product IDs
  const wishlistIds: string[] = productIds || [];

  return (
    <section className={style.productList}>
      <Sort />
      <ShopList userWishlist={wishlistIds} />
      <PaginationComponent />
      <FeaturedList />
    </section>
  );
};

export default ProductList;
