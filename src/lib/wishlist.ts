"use server";
import { getCurrentUser } from "../components/helper/session";
import axios, { isAxiosError } from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export const getWishlistData = async (page: number = 1, limit: number = 20) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      console.log("User not found in session, cannot fetch wishlist");
      return [];
    }

    if (!process.env.API_REQUEST_URL) {
      console.error("API_REQUEST_URL is not defined in environment variables");
      return [];
    }

    const apiUrl = `${process.env.API_REQUEST_URL}/api/wishlistList?user=${user.email}&page=${page}&limit=${limit}`;
    console.log("Fetching wishlist from:", apiUrl);

    // Set a shorter timeout for the fetch operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await fetch(apiUrl, {
        next: { tags: ["wishlist"] },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch wishlist: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        console.error("Wishlist request timed out");
        return { error: "Request timed out", items: [] };
      }
      throw error;
    }
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    return [];
  }
};

export const deleteWishListItem = async (productId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("User not found in session, please log in");
    }

    if (!user.email) {
      throw new Error("User email not found");
    }

    // Set a timeout for the operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await axios.delete(
        `${process.env.API_REQUEST_URL}/api/wishlistList`,
        {
          params: {
            id: productId,
            user: user.email,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      revalidateTag("wishlist");
      return response.status;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    }
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    throw error;
  }
};

export const deleteAllWishlistProducts = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("User not found in session, please log in");
    }

    if (!user.email) {
      throw new Error("User email not found");
    }

    // Set a timeout for the operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await axios.delete(
        `${process.env.API_REQUEST_URL}/api/wishlistList/deleteAll`,
        {
          params: {
            user: user.email,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);
      revalidateTag("wishlist");
      return response.status;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    }
  } catch (error) {
    console.error("Error deleting all wishlist items:", error);
    throw error;
  }
};

export const addItemToWishList = async (productId: number) => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Please log in to add items to your wishlist");
    }

    if (!user.email) {
      throw new Error("User email not found");
    }

    // Set a timeout for the operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const response = await axios.patch(
        `${process.env.API_REQUEST_URL}/api/favouriteProduct`,
        {
          params: {
            id: productId,
            user: user.email,
          },
        },
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const responseData = {
        message: response?.data.message,
        status: response?.status,
      };

      revalidateTag("featureProducts");
      revalidateTag("wishlist");

      return responseData;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Request timed out. Please try again.");
      }
      throw error;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error("Please log in to add items to your wishlist");
    }
    throw error;
  }
};

export const getAllWishListProductsIds = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) return [];

    const products = await getWishlistData();

    if (!Array.isArray(products)) {
      console.error("Unexpected format for products:", products);
      return [];
    }

    const idArray = products.map((product) => product._id);
    return idArray;
  } catch (error) {
    console.error("Error getting wishlist product IDs:", error);
    return [];
  }
};
