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

    const wishlistData = await getWishlistData();
    return NextResponse.json(wishlistData);
  } catch (error) {
    console.error("Error in wishlist API:", error);
    return NextResponse.json(
      { error: "Failed to fetch wishlist data" },
      { status: 500 }
    );
  }
}
