import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import User from "@/models/user";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("user");

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Update user to have an empty wishlist array
    const result = await User.updateOne(
      { email: userEmail },
      { $set: { wishlist: [] } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Wishlist already empty or user not found" },
        { status: 404 }
      );
    }

    // Revalidate the wishlist tag to update both server and client data
    revalidateTag("wishlist");

    return NextResponse.json({
      message: "All products removed from wishlist",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting all wishlist products:", error);
    return NextResponse.json(
      { error: "Failed to delete all items from wishlist" },
      { status: 500 }
    );
  }
}
