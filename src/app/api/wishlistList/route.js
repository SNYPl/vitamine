import { NextResponse } from "next/server";
import Vitamine from "@/models/Vitamine";
import User from "@/models/user";

export async function GET(req) {
  try {
    const userEmail = req.nextUrl.searchParams.get("user");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "20");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Find user with just the wishlist field to reduce query size
    const user = await User.findOne(
      { email: userEmail },
      { wishlist: 1 }
    ).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If wishlist is empty, return immediately
    if (!user.wishlist || user.wishlist.length === 0) {
      return NextResponse.json([]);
    }

    // Add pagination to prevent timeouts with large wishlists
    const skip = (page - 1) * limit;
    const wishlistSubset = user.wishlist.slice(skip, skip + limit);

    // Only fetch needed fields
    const vitamines = await Vitamine.find(
      { _id: { $in: wishlistSubset } },
      { name: 1, price: 1, images: 1, category: 1 } // Limit fields returned
    ).lean();

    return NextResponse.json(vitamines);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist" },
      { status: 500 }
    );
  }
}

export const DELETE = async (req) => {
  try {
    const productId = req.nextUrl.searchParams.get("id");
    const userEmail = req.nextUrl.searchParams.get("user");

    if (!productId || !userEmail) {
      return NextResponse.json(
        { error: "Product ID and user email are required" },
        { status: 400 }
      );
    }

    const result = await User.updateOne(
      { email: userEmail },
      { $pull: { wishlist: productId } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Item not in wishlist or user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error deleting wishlist product:", error);
    return NextResponse.json(
      { error: "Failed to delete item from wishlist" },
      { status: 500 }
    );
  }
};

export async function POST(req) {
  try {
    const userEmail = req.nextUrl.searchParams.get("user");
    const body = await req.json();

    // If an alternative action is specified in the body
    if (body && body.action === "count") {
      const user = await User.findOne(
        { email: userEmail },
        { wishlist: 1 }
      ).lean();
      return NextResponse.json({ count: user?.wishlist?.length || 0 });
    }

    // Default behavior - same as GET but can be modified later if needed
    const user = await User.findOne(
      { email: userEmail },
      { wishlist: 1 }
    ).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.wishlist || user.wishlist.length === 0) {
      return NextResponse.json([]);
    }

    const vitamines = await Vitamine.find({
      _id: { $in: user.wishlist },
    }).lean();
    return NextResponse.json(vitamines);
  } catch (error) {
    console.error("Error in wishlist POST:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
