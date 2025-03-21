import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header/Header";
import Footer from "@/components/footer/Footer";
import BackTop from "antd/es/float-button/BackTop";
import { QueryClientProviderHelper } from "@/components/helper/queryClient";
import { ReduxToolkitProvider } from "@/components/helper/reduxProvider";
import React from "react";
import ProductInfoModal from "@/components/productInfoModal/ProductInfoModal";
import AuthWrapper from "./auth_wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Vitamine Store | Premium Health Supplements",
    template: "%s | Vitamine Store",
  },
  description:
    "Premium quality vitamins and supplements for your health and wellbeing. Shop our wide range of nutritional products.",
  keywords: ["vitamins", "supplements", "health", "nutrition", "wellness"],
  authors: [{ name: "Vitamine Store" }],
  creator: "Vitamine Store",
  publisher: "Vitamine Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vitamine-store.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vitamine Store | Premium Health Supplements",
    description:
      "Premium quality vitamins and supplements for your health and wellbeing. Shop our wide range of nutritional products.",
    url: "/",
    siteName: "Vitamine Store",
    images: [
      {
        url: "/opengraph-image.jpg", // create this image in public directory
        width: 1200,
        height: 630,
        alt: "Vitamine Store - Premium Supplements",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitamine Store | Premium Health Supplements",
    description:
      "Premium quality vitamins and supplements for your health and wellbeing. Shop our wide range of nutritional products.",
    images: ["/twitter-image.jpg"], // create this image in public directory
    creator: "@vitamine_store", // replace with actual account
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <React.StrictMode>
        <body className={inter.className}>
          <ReduxToolkitProvider>
            <QueryClientProviderHelper>
              <AuthWrapper>
                <Header />
                <ProductInfoModal />
                {children}
              </AuthWrapper>
            </QueryClientProviderHelper>
            <footer className={"container"}>
              <Footer />
            </footer>
            <BackTop />
          </ReduxToolkitProvider>
        </body>
      </React.StrictMode>
    </html>
  );
}
