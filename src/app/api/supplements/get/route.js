import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const allVitamines = await Vitamine.find({
      productQuantity: { $ne: 0, $exists: true },
    });

    const vitaminesWithZeroQuantity = await Vitamine.find({
      productQuantity: 0,
    });

    const finalResult = allVitamines.concat(vitaminesWithZeroQuantity);

    return new NextResponse(JSON.stringify(finalResult), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
