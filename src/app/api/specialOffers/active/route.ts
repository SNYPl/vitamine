import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SpecialOffer from "@/models/SpecialOffer";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Find the currently active special offer
    const offer = await SpecialOffer.findOne({ isActive: true }).sort({ createdAt: -1 }).limit(1);
    
    return NextResponse.json({
      success: true,
      offer: offer
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 