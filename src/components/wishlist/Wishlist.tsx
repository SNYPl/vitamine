import React from "react";
import style from "./style.module.scss";
import ItemList from "./itemList/ItemList";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import { getWishlistData } from "../../lib/wishlist";

const Wishlist: React.FC = async ({}) => {
  const wishlistData = await getWishlistData();

  return (
    <section className={`${style.wishlist}`}>
      <ParamInfo />
      <ItemList wishlistData={wishlistData} />
    </section>
  );
};

export default Wishlist;
