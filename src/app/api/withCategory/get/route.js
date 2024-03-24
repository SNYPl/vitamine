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
  const itemsPerPage = req.nextUrl.searchParams.get("itemsPerPage") || 12;
  const sortingValue = req.nextUrl.searchParams.get("sort") || "default";

  const path = req.nextUrl.pathname;

  try {
    await connectDB();

    const skip = (page - 1) * itemsPerPage;

    const priceFilter = {
      $or: [
        { discount: { $gte: min, $lte: max } },
        { price: { $gte: min, $lte: max } },
      ],
    };

    let query;
    let totalDocuments;

    if (search) {
      const searchWords = search.split(/\s+/).map(escapeRegExp);
      const regexSearch = new RegExp(searchWords.join("|"), "i");

      query = {
        tags: { $regex: regexSearch },
        ...priceFilter,
      };

      totalDocuments = await Vitamine.countDocuments(query);
    } else if (category) {
      query = {
        category,
        ...priceFilter,
      };

      totalDocuments = await Vitamine.countDocuments(query);
    } else {
      query = {
        ...priceFilter,
      };

      totalDocuments = await Vitamine.countDocuments(query);
    }

    //sorting
    let sortCriteria = {};

    switch (sortingValue) {
      case "lowHight":
        sortCriteria = { price: 1 };
        break;
      case "highLow":
        sortCriteria = { price: -1 };
        break;
      case "rating":
        sortCriteria = { rating: -1 };
        break;

      case "review":
        sortCriteria = { review: -1 };
        break;
      default:
        break;
    }

    // Fetch the actual data using skip and limit
    const allVitamines = await Vitamine.find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(itemsPerPage);

    revalidatePath(path);

    return new NextResponse(
      JSON.stringify({ allVitamines, total: totalDocuments }),
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
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
