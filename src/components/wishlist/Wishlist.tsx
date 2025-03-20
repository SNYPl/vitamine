"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";
import ItemList from "./itemList/ItemList";
import ParamInfo from "../shopPage/paramInfo/ParamInfo";
import { useSession } from "next-auth/react";
// import { FaHeart } from "react-icons/fa";
import { Spin } from "antd";

// Change this to a client component with session handling
const WishlistPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [wishlistData, setWishlistData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // Fetch data when authenticated
    if (status === "authenticated") {
      fetch("/api/wishlistData")
        .then((response) => response.json())
        .then((data) => {
          setWishlistData(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
          setLoading(false);
        });
    }
  }, [status, router]);

  // Loading state
  if (status === "loading" || loading) {
    return (
      <div className={style.loadingContainer}>
        <Spin size="large" />
        <p>Loading your wishlist...</p>
      </div>
    );
  }

  const isEmpty = !wishlistData || wishlistData.length === 0;

  return (
    <section className={`${style.wishlist}`}>
      <ParamInfo />

      <div className={style.wishlistHeader}>
        <h1>{/* <FaHeart className={style.heartIcon} /> My Wishlist */}</h1>
        <p>Items you've saved for later</p>
      </div>

      {isEmpty ? (
        <div className={style.emptyWishlist}>
          {/* <FaHeart className={style.emptyIcon} /> */}
          <h2>Your wishlist is empty</h2>
          <p>Browse our products and add items you love to your wishlist</p>
          <a href="/shop" className={style.shopButton}>
            Shop Now
          </a>
        </div>
      ) : (
        <ItemList wishlistData={wishlistData} />
      )}
    </section>
  );
};

export default WishlistPage;
