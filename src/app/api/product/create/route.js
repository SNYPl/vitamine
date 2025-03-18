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
    
    if (!data.name) {
      return new NextResponse(
        JSON.stringify({ error: "Vitamin name is required" }),
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const newVitamin = new Vitamine(data);
    await newVitamin.save();
    
    return new NextResponse(
      JSON.stringify({ 
        success: true, 
        message: "Vitamin created successfully",
        vitamin: newVitamin
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating vitamin:", error);
    
    return new NextResponse(
      JSON.stringify({ error: "Error creating vitamin", details: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
} 