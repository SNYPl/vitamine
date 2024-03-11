import React from "react";
import style from "./style.module.scss";
import ItemList from "./itemList/ItemList";

const Wishlist: React.FC = ({}) => {
  return (
    <section className={`${style.wishlist}`}>
      <ItemList />
    </section>
  );
};

export default Wishlist;
