import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const allVitamines = await Vitamine.find();

    return new NextResponse(JSON.stringify(allVitamines), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
