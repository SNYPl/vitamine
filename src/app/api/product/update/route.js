import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";
import { getCurrentUser } from "@/components/helper/session";

export async function POST(req) {
  try {
    // Get the current user to check if they're an admin
    const user = await getCurrentUser();
    const userEmail = user?.email;
    
    // Check if user is admin
    if (userEmail !== process.env.ADMIN_EMAIL) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 403 }
      );
    }
    
    const data = await req.json();
    
    if (!data._id) {
      return new NextResponse(
        JSON.stringify({ error: "Vitamin ID is required" }),
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Remove the _id from the update data
    const { _id, ...updateData } = data;
    
    const updatedVitamin = await Vitamine.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    
    if (!updatedVitamin) {
      return new NextResponse(
        JSON.stringify({ error: "Vitamin not found" }),
        { status: 404 }
      );
    }
    
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        message: "Vitamin updated successfully",
        vitamin: updatedVitamin
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
      JSON.stringify({ error: "Error updating vitamin", details: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
} 