import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, bucketName } from "./aws-config";
import { v4 as uuidv4 } from "uuid";

// Function to upload a single image to S3
export async function uploadImageToS3(file: File): Promise<string> {
  try {
    // Generate a unique file name to prevent overwriting existing files
    const fileExtension = file.name.split('.').pop();
    const fileName = `uploads/${uuidv4()}.${fileExtension}`;
    
    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    
    // Set up the S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    };
    
    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    // Return the file URL
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Image upload failed");
  }
}

// Function to upload multiple images to S3
export async function uploadMultipleImagesToS3(files: File[]): Promise<string[]> {
  try {
    // Upload each file and collect the URLs
    const uploadPromises = files.map(file => uploadImageToS3(file));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Multiple image upload failed");
  }
} 