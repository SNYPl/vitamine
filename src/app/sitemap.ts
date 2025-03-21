import { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://vitamine-store.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Connect to the database
  await connectDB();

  // Get all products
  const products = await Vitamine.find({}).lean();

  // Create sitemap entries for products
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/product?id=${product._id}`,
    lastModified: new Date(
      product.updatedAt || product.createdAt || new Date()
    ),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Generate static page entries
  const routes = [
    "",
    "/about",
    "/shop",
    "/contact",
    "/login",
    "/signup",
    "/forgotPassword",
    "/wishlist",
    "/terms",
    "/privacy-policy",
  ];

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.7,
  }));

  // Combine static pages and product pages
  return [...staticPages, ...productEntries];
}
