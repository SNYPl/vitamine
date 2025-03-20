import { S3Client } from "@aws-sdk/client-s3";

// Configure the AWS S3 client
export const s3Client = new S3Client({
  region: "eu-north-1", // Make sure this matches your bucket region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const bucketName = "vitvit123"; // Your bucket name 