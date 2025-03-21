"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductStructuredData from "./ProductStructuredData";

export function ProductDataHandler() {
  const [product, setProduct] = useState<any>(null);
  const searchParams = useSearchParams();
  const productId = searchParams?.get("id");

  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        try {
          const res = await fetch(`/api/product/get?productId=${productId}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
              setProduct(data[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    }

    fetchProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <ProductStructuredData
      product={product}
      siteUrl={
        process.env.NEXT_PUBLIC_SITE_URL || "https://vitamine-store.vercel.app"
      }
    />
  );
}
