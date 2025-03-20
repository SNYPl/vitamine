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
  title: "Vitamine Store",
  description: "Vitamine Supplement Store",
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
