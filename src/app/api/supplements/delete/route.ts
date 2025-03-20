import { NextRequest, NextResponse } from "next/server";
import connectDB from '@/lib/db';
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import Vitamine from "@/models/Vitamine";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 client
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const bucketName = "vitvit123";

export async function DELETE(request: NextRequest) {
  try {
    // Check for authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the product ID from the query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();
    
    // First get the product to retrieve image URLs
    const product = await Vitamine.findById(new ObjectId(id));
    
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    
    // Collect all S3 image URLs from the product
    const imageUrls = [];
    if (product.mainImage && product.mainImage.includes('s3.amazonaws.com')) {
      imageUrls.push(product.mainImage);
    }
    
    if (product.images && product.images.length > 0) {
      product.images.forEach((img: string) => {
        if (img && img.includes('s3.amazonaws.com')) {
          imageUrls.push(img);
        }
      });
    }
    
    // Delete images from S3
    const deletePromises = imageUrls.map(async (url) => {
      try {
        // Extract the key from the URL - assumes format like https://bucketname.s3.amazonaws.com/uploads/filename.ext
        const urlParts = url.split('/');
        const key = urlParts.slice(3).join('/'); // Get everything after the bucket name
        
        const params = {
          Bucket: bucketName,
          Key: key
        };
        
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        console.log(`Deleted image: ${key}`);
      } catch (error) {
        console.error(`Error deleting image from S3: ${url}`, error);
        // Continue with other deletions even if one fails
      }
    });
    
    // Wait for all S3 deletions to complete
    await Promise.all(deletePromises);

    // Delete the product from the database
    const result = await Vitamine.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product and associated images deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
} 