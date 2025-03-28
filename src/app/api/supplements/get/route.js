import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

// Set export const dynamic = 'force-dynamic' to prevent static generation and caching
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

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

    // Add a random number to each response to bypass any potential caching
    const noCacheTimestamp = Date.now();

    return new NextResponse(
      JSON.stringify({ data: finalResult, ts: noCacheTimestamp }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
          "X-Accel-Expires": "0",
        },
      }
    );
  } catch (error) {
    return new NextResponse("error in fetching " + error, {
      status: 500,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
};
