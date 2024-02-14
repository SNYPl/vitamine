import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { revalidatePath } from "next/cache";

export const GET = async (req, res) => {
  const category = req.nextUrl.searchParams.get("category");
  const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
  const search = req.nextUrl.searchParams.get("search");
  const min = req.nextUrl.searchParams.get("min") || 0;
  const max = req.nextUrl.searchParams.get("max") || 500;

  const path = req.nextUrl.pathname;

  try {
    await connectDB();

    const itemsPerPage = 12;
    const skip = (page - 1) * itemsPerPage;

    let allVitamines;

    const priceFilter = {
      $or: [
        { discount: { $gte: min, $lte: max } },
        { price: { $gte: min, $lte: max } },
      ],
    };

    if (search) {
      const searchWords = search.split(/\s+/).map(escapeRegExp);
      const regexSearch = new RegExp(searchWords.join("|"), "i");

      allVitamines = await Vitamine.find({
        tags: { $regex: regexSearch },
        ...priceFilter,
      })
        .skip(skip)
        .limit(itemsPerPage);
    } else if (category) {
      allVitamines = await Vitamine.find({
        category,
        ...priceFilter,
      })
        .skip(skip)
        .limit(itemsPerPage);
    } else {
      allVitamines = await Vitamine.find({
        ...priceFilter,
      })
        .skip(skip)
        .limit(itemsPerPage);
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
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
