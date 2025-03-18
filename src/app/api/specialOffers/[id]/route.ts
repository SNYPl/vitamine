import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SpecialOffer from "@/models/SpecialOffer";
import { getCurrentUser } from "@/components/helper/session";

// GET a specific offer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const offer = await SpecialOffer.findById(params.id);
    
    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Special offer not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      offer
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Update a specific offer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    // Only admin can update offers
    if (!user || (user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const body = await request.json();
    
    // If this offer is being activated, deactivate all others
    if (body.isActive === true) {
      await SpecialOffer.updateMany({}, { isActive: false });
    }
    
    const updatedOffer = await SpecialOffer.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedOffer) {
      return NextResponse.json(
        { success: false, error: "Special offer not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      offer: updatedOffer
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Delete a specific offer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    // Only admin can delete offers
    if (!user || (user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const deletedOffer = await SpecialOffer.findByIdAndDelete(params.id);
    
    if (!deletedOffer) {
      return NextResponse.json(
        { success: false, error: "Special offer not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Special offer deleted successfully"
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
} 