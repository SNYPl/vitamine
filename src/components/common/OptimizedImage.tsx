"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  style?: React.CSSProperties;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "100vw",
  style,
  fill = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  // Handle external images vs Next.js optimized images
  const isExternal = imgSrc.startsWith("http") || imgSrc.startsWith("data:");

  // Create descriptive alt text if none provided
  const safeAlt = alt || "Product image - Vitamine Store";

  // Handle loading and error states
  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setImgSrc("/placeholder-image.jpg"); // Create a placeholder image
  };

  return (
    <div
      className={`image-container ${className} ${
        loading ? "image-loading" : ""
      }`}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
        ...(fill ? { width: "100%", height: "100%" } : {}),
      }}
    >
      {isExternal ? (
        // For external images that can't be optimized by Next.js
        <img
          src={imgSrc}
          alt={safeAlt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          style={{
            objectFit: "cover",
            width: fill ? "100%" : width,
            height: fill ? "100%" : height,
          }}
        />
      ) : (
        // For images that can be optimized by Next.js
        <Image
          src={imgSrc}
          alt={safeAlt}
          width={fill ? undefined : width || 500}
          height={fill ? undefined : height || 500}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError as any}
          sizes={sizes}
          fill={fill}
          style={{ objectFit: "cover" }}
        />
      )}

      {/* Optional loading state */}
      {loading && (
        <div
          className="image-placeholder"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="loading-spinner"></span>
        </div>
      )}
    </div>
  );
}
