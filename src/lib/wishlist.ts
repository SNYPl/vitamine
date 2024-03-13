"use server";
import { getCurrentUser } from "../components/helper/session";
import axios, { isAxiosError } from "axios";
import { revalidatePath, revalidateTag } from "next/cache";

export const getWishlistData = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("user not found, log in");
    }

    const response = await fetch(
      `${process.env.API_REQUEST_URL}/api/wishlistList?user=${user?.email}`,
      {
        next: { tags: ["wishlist"] },

        method: "GET",
        // headers: new Headers(headers()),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error;
  }
};

export const deleteWishListItem = async (productId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("user not found, log in");
  }

  const response = await axios.delete(
    `${process.env.API_REQUEST_URL}/api/wishlistList`,
    {
      params: {
        id: productId,
        user: user?.email,
      },
    }
  );

  revalidateTag("wishlist");

  return response.status;
};

export const deleteAllWishlistProducts = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("user not found, log in");
  }

  const response = await axios.delete(
    `${process.env.API_REQUEST_URL}/api/wishlistList/deleteAll`,
    {
      params: {
        user: user?.email,
      },
    }
  );

  revalidateTag("wishlist");

  return response.status;
};

export const addItemToWishList = async (productId: number) => {
  try {
    const user = await getCurrentUser();

    const response = await axios.patch(
      `${process.env.API_REQUEST_URL}/api/favouriteProduct`,
      {
        params: {
          id: productId,
          user: user?.email,
        },
      }
    );

    const responseData = {
      message: response?.data.message,
      status: response?.status,
    };

    revalidateTag("featureProducts");
    revalidateTag("wishlist");

    return responseData;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error("გაიარეთ ავტორიზაცია");
    }
  }
};

export const getAllWishListProductsIds = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const products = await getWishlistData();

  const idArray = products.map((product: any) => product._id);

  return idArray;
};
