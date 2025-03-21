import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { revalidatePath } from "next/cache";

export const GET = async (req, res) => {
  const category = req.nextUrl.searchParams.get("category");
  const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
  const search = req.nextUrl.searchParams.get("search");

  // Convert min and max to numbers explicitly
  const min = parseInt(req.nextUrl.searchParams.get("min")) || 0;
  const max = parseInt(req.nextUrl.searchParams.get("max")) || 500;

  const itemsPerPage = parseInt(req.nextUrl.searchParams.get("limit")) || 12;
  const sortingValue = req.nextUrl.searchParams.get("sort") || "default";

  const path = req.nextUrl.pathname;

  try {
    await connectDB();

    const skip = (page - 1) * itemsPerPage;

    // Simplified price filter approach
    let priceFilter;

    // We'll create a simpler filter based on the price field only first
    // to check if the basic filtering works
    priceFilter = {
      price: { $gte: min, $lte: max },
    };

    let query = {};

    if (search) {
      const searchWords = search.split(/\s+/).map(escapeRegExp);
      const regexSearch = new RegExp(searchWords.join("|"), "i");

      query = {
        $or: [
          { tags: { $regex: regexSearch } },
          { name: { $regex: regexSearch } },
        ],
        ...priceFilter,
      };
    } else if (category) {
      query = {
        category,
        ...priceFilter,
      };
    } else {
      query = {
        ...priceFilter,
      };
    }

    // First let's count all documents to check against our filter
    const allDocsCount = await Vitamine.countDocuments({});

    // Then count filtered documents
    const totalDocuments = await Vitamine.countDocuments(query);

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

    // Sample a product to check its structure
    const sampleProduct =
      allVitamines.length > 0
        ? { price: allVitamines[0].price, discount: allVitamines[0].discount }
        : null;

    revalidatePath(path);

    return new NextResponse(
      JSON.stringify({
        allVitamines,
        total: totalDocuments,
        debug: {
          filters: { min, max },
          totalProducts: allDocsCount,
          filteredProducts: totalDocuments,
          sampleProduct,
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return new NextResponse("error in fetching " + error);
  }
};

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
