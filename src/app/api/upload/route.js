import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client - use environment variables directly
const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const bucketName = "vitvit123";

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Get form data with the file
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Get file data and create unique name
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = file.name.split('.').pop();
    const fileName = `uploads/${uuidv4()}.${fileExtension}`;
    
    // Set up the S3 upload parameters - removing ACL which might be causing issues
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
      // Removing ACL as it may not be allowed on your bucket configuration
    };
    
    // Upload to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    // Return the S3 URL
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    
    return NextResponse.json({ message: 'File uploaded', url: fileUrl });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    
    return NextResponse.json(
      { message: 'Failed to upload file to S3', error: error.message },
      { status: 500 }
    );
  }
}