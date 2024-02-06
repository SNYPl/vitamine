import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();

    const featuredProducts = await Vitamine.find({ isFeatured: true });

    return new NextResponse(JSON.stringify(featuredProducts), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return new NextResponse("error in fetching " + error);
  }
}
