import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SpecialOffer from "@/models/SpecialOffer";
import { getCurrentUser } from "@/components/helper/session";

// GET all special offers
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const offers = await SpecialOffer.find().sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      offers
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Create a new special offer
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    // Only admin can create offers
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const body = await request.json();
    
    const newOffer = await SpecialOffer.create(body);
    
    return NextResponse.json({
      success: true,
      offer: newOffer
    }, { status: 201 });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 