import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/components/helper/session";

export async function POST(req) {
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

    const data = await req.json();

    if (!data._id) {
      return new NextResponse(
        JSON.stringify({ error: "Product ID is required" }),
        { status: 400 }
      );
    }

    await connectDB();

    // Find and update the vitamin
    const updatedVitamin = await Vitamine.findByIdAndUpdate(
      data._id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedVitamin) {
      return new NextResponse(JSON.stringify({ error: "Vitamin not found" }), {
        status: 404,
      });
    }

    // Revalidate dashboard path to reflect updates
    revalidatePath("/dashboard");

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Vitamin updated successfully",
        vitamin: updatedVitamin,
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
    console.error("Error updating vitamin:", error);

    return new NextResponse(
      JSON.stringify({
        error: "Error updating vitamin",
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
