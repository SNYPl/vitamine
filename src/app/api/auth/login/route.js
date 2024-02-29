import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const bestSellingVitamines = await Vitamine.find(
      {},
      {
        name: 1,
        _id: 1,
        category: 1,
        mainImage: 1,
        price: 1,
        discount: 1,
        introduction: 1,
        country: 1,
        sold: 1,
        productQuantity: 1,
      },
      { sort: { sold: -1, productQuantity: -1 }, limit: 18 }
    );

    return new NextResponse(JSON.stringify(bestSellingVitamines), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
