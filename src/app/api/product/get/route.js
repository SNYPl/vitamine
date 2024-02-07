import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const GET = async (req, res) => {
  const id = req.nextUrl.searchParams.get("productId");

  try {
    await connectDB();

    const product = await Vitamine.find({ _id: id });

    return new NextResponse(JSON.stringify(product), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
