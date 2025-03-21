import styles from "./page.module.css";
import ProductPageComponent from "@/components/productPage/ProductPage";
import Companies from "@/components/companies/Companies";
import BurgerMenu from "@/components/productMenu/burgerMenu/BurgerMenu";
import Search from "@/components/productMenu/productSearch/search/Search";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { product: string };
  searchParams: { id?: string };
};

// Generate dynamic metadata for the product page
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read the product ID from search params
  const productId = searchParams.id;

  if (!productId) {
    // Return default metadata if no product ID is found
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }

  // Fetch product data
  await connectDB();
  const product = await Vitamine.findById(productId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }

  // Extract product information for SEO
  const productName = product.name;
  const productDescription =
    product.infoTitle || product.about || "Premium quality vitamin supplement";
  const productImage = product.mainImage || "/opengraph-image.jpg";

  // Construct price information
  const price = product.price;
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? price - (price * product.discount) / 100
    : price;

  // Calculate product availability
  const inStock = product.productQuantity > 0;

  // Create SEO metadata
  return {
    title: productName,
    description: productDescription.substring(0, 160),
    alternates: {
      canonical: `/product?id=${productId}`,
    },
    openGraph: {
      title: productName,
      description: productDescription.substring(0, 160),
      url: `/product?id=${productId}`,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: productName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description: productDescription.substring(0, 160),
      images: [productImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { product: number | string };
}) {
  return (
    <main className={styles.product}>
      <div className={"container"}>
        <section className={styles.searchMenu}>
          <BurgerMenu activeMenu={false} />
          <Search />
        </section>
        <ProductPageComponent />
        <Companies />
      </div>
    </main>
  );
}
