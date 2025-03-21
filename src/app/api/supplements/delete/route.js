import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/components/helper/session";

export async function DELETE(req) {
  try {
    // Get the current user to check if they're an admin
    const user = await getCurrentUser();
    const userEmail = user?.email;

    // Check if user is admin
    if (userEmail !== process.env.ADMIN_EMAIL) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    // Get the product ID from the URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "Product ID is required" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Find and delete the vitamin
    const deletedVitamin = await Vitamine.findByIdAndDelete(id);

    if (!deletedVitamin) {
      return new NextResponse(JSON.stringify({ error: "Vitamin not found" }), {
        status: 404,
      });
    }

    // Revalidate dashboard path to refresh data
    revalidatePath("/dashboard");

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Vitamin deleted successfully",
        revalidated: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting vitamin:", error);

    return new NextResponse(
      JSON.stringify({
        error: "Error deleting vitamin",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
