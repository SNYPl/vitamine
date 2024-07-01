/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vitvit123.s3.eu-north-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
