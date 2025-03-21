"use client";

import { useEffect, useRef } from "react";

interface Vitamin {
  _id: string;
  name: string;
  infoTitle?: string;
  about?: string;
  mainImage: string;
  images?: string[];
  price: number;
  discount?: number;
  productQuantity: number;
  packageQuantity?: string | number;
  description?: string[];
  category?: string[];
  country?: string;
  warning?: string;
  use?: string;
  rating?: number[];
  review?: any[];
}

interface ProductStructuredDataProps {
  product: Vitamin;
  siteUrl: string;
}

// Define the schema type
interface ProductSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": string;
    name: string;
  };
  sku: string;
  mpn: string;
  offers: {
    "@type": string;
    url: string;
    priceCurrency: string;
    price: string;
    priceValidUntil: string;
    availability: string;
    seller: {
      "@type": string;
      name: string;
    };
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    reviewCount: number;
  };
}

export default function ProductStructuredData({
  product,
  siteUrl,
}: ProductStructuredDataProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!product) return;

    // Calculate review data if available
    const hasReviews = product.review && product.review.length > 0;
    let aggregateRating = null;

    if (hasReviews && product.rating && product.rating.length > 0) {
      const totalRating = product.rating.reduce(
        (acc, rating) => acc + rating,
        0
      );
      const averageRating = totalRating / product.rating.length;

      aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: averageRating.toFixed(1),
        reviewCount: product.review?.length || 0,
      };
    }

    // Handle discount price
    const hasDiscount = product.discount !== undefined && product.discount > 0;
    const price = product.price;
    const discountedPrice = hasDiscount
      ? price - (price * (product.discount || 0)) / 100
      : price;

    // Create product schema
    const productSchema: ProductSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      description:
        product.infoTitle ||
        product.about ||
        product.description?.join(". ") ||
        "Premium vitamin supplement",
      image: product.mainImage
        ? [product.mainImage].concat(product.images || [])
        : [],
      brand: {
        "@type": "Brand",
        name: "Vitamine Store",
      },
      sku: product._id,
      mpn: product._id,
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/product?id=${product._id}`,
        priceCurrency: "USD",
        price: discountedPrice.toFixed(2),
        priceValidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        )
          .toISOString()
          .split("T")[0],
        availability:
          product.productQuantity > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Vitamine Store",
        },
      },
    };

    // Add aggregate rating if available
    if (aggregateRating) {
      productSchema.aggregateRating = aggregateRating;
    }

    // Create or update the script element
    if (!scriptRef.current) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.type = "application/ld+json";
      document.head.appendChild(scriptRef.current);
    }

    scriptRef.current.textContent = JSON.stringify(productSchema);

    // Cleanup on unmount
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [product, siteUrl]);

  // This component doesn't render anything visible
  return null;
}
