"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import { Skeleton } from "antd";
import Product from "@/components/product/Product";
import { motion } from "framer-motion";

const FeaturedList: React.FC = () => {
  const [randomProducts, setRandomProducts] = useState<any[]>([]);
  
  const { data, isLoading, isError } = useQuery(
    "featuredProducts",
    async () => {
      try {
        const response = await axios.get("/api/featuredProducts/get");
        return response.data;
      } catch (error) {
        console.error("Error fetching featured products", error);
        throw new Error("Error fetching featured products");
      }
    }
  );

  // Function to get random products
  useEffect(() => {
    if (data && data.length > 0) {
      // Select 4 random products
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 4));
    }
  }, [data]);

  return (
    <section className={`${style.featured}`}>
      {data?.length > 0 && (
        <>
          <motion.article 
            className={`${style.title}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>პოპულალური პროდუქტები</h2>
            <div className={style.titleUnderline}></div>
          </motion.article>
          
          {isLoading ? (
            <div className={style.skeletonContainer}>
              {[1, 2, 3, 4].map((item) => (
                <article key={item} className={style.skeleton}>
                  <Skeleton active />
                </article>
              ))}
            </div>
          ) : (
            <motion.section 
              className={`${style.featuredProductsList}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {randomProducts.map((product, index) => (
                <motion.div 
                  className={`${style.product}`} 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)" 
                  }}
                >
                  <Product {...product} introduction />
                </motion.div>
              ))}
            </motion.section>
          )}
          
          <motion.div 
            className={style.viewAllContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a href="/shop" className={style.viewAllButton}>
              ყველა პროდუქტის ნახვა
            </a>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default FeaturedList;
