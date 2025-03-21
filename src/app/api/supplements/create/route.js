import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Supplement from "@/models/Vitamine";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    // Parse the request body
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.price || !data.productQuantity) {
      return NextResponse.json(
        { message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Create a new supplement with all fields matching the edit form
    const supplement = new Supplement({
      // Basic Information
      name: data.name,
      category: data.category || [],
      infoTitle: data.infoTitle || "",
      price: data.price,
      discount: data.discount || 0,
      productQuantity: data.productQuantity,
      packageQuantity: data.packageQuantity || "",
      tabletSize: data.tabletSize || 0,
      sold: data.sold || 0,
      country: data.country || "",

      // Flags/Booleans
      mainDaleOfWeek: data.mainDaleOfWeek || false,
      daleOfWeek: data.daleOfWeek || false,
      isFeatured: data.isFeatured || false,

      // Images
      mainImage: data.mainImage || "",
      images: data.images || [],

      // Content
      about: data.about || "",
      description: data.description || [],
      use: data.use || "",
      otherIngredients: data.otherIngredients || [],
      warning: data.warning || "",

      // Supplement Facts
      supplementFacts: data.supplementFacts || [],

      // Additional Information
      tags: data.tags || [],
      rating: data.rating || [],
      review: data.review || [],

      // Metadata
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the supplement to the database
    await supplement.save();

    // Revalidate the dashboard path to refresh the data
    revalidatePath("/dashboard");

    // Return a success response
    return NextResponse.json(
      {
        message: "Supplement created successfully",
        supplement,
        revalidated: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating supplement:", error);

    return NextResponse.json(
      { message: "Failed to create supplement", error: error.message },
      { status: 500 }
    );
  }
}
