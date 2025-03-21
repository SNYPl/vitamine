import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getWishlistData } from "@/lib/wishlist";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get pagination parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    // Set a reasonable timeout for the operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
      const wishlistData = await getWishlistData();
      clearTimeout(timeoutId);
      return NextResponse.json(wishlistData);
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timed out. Try again with fewer items." },
          { status: 408 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist data" },
      { status: 500 }
    );
  }
}
