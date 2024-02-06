import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { revalidatePath } from "next/cache";

export const GET = async (req, res) => {
  const category = req.nextUrl.searchParams.get("category");

  const path = req.nextUrl.pathname;

  try {
    await connectDB();
    let allVitamines;

    if (category) {
      allVitamines = await Vitamine.find({ category });
    } else {
      allVitamines = await Vitamine.find();
    }

    revalidatePath(path);

    return new NextResponse(JSON.stringify(allVitamines), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("error in fetching " + error);
  }
};
