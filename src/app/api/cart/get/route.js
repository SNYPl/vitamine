import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import mongoose from "mongoose";

export const GET = async (req, res) => {
  const cartItemsJson = req.nextUrl.searchParams.get("cartItems");

  try {
    const cartItems = JSON.parse(cartItemsJson);

    // Extract id values and quantity from cartItems
    const cartItemData = cartItems.map((item) => ({
      id: new mongoose.Types.ObjectId(item.id),
      quantity: item.quantity || 1, // default to 1 if quantity is not provided
    }));

    await connectDB();

    const allVitamines = await Vitamine.find({
      _id: { $in: cartItemData.map((item) => item.id) },
    });

    // Calculate total price for each product and overall total price
    let totalPrice = 0;
    const productsWithTotalPrice = allVitamines.map((product) => {
      const cartItem = cartItemData.find((item) => item.id.equals(product._id));

      // Check if there is a discount, and use the discounted price if available
      const productPrice = product.discount ? product.discount : product.price;

      const productTotalPrice = productPrice * cartItem.quantity;
      totalPrice += productTotalPrice;

      return {
        ...product.toObject(),
        totalPrice: productTotalPrice,
        choosedQuantity: cartItem.quantity,
        price: productPrice, // Add the calculated price to the response
      };
    });

    return new NextResponse(
      JSON.stringify({ products: productsWithTotalPrice, totalPrice }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
