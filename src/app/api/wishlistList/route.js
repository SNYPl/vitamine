import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const data = await req.nextUrl.searchParams.get("wishlistItems");
    const list = JSON.parse(data);

    // Use the $in operator to find all products with the specified IDs
    const vitamines = await Vitamine.find({ _id: { $in: list } });

    return new NextResponse(JSON.stringify(vitamines), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error in fetching " + error);
  }
};
