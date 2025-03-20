import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize S3 client
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
    
    // Get form data with the files
    const formData = await request.formData();
    const urls = [];
    
    // Process each file in the form data
    for (const [key, value] of formData.entries()) {
      if (value instanceof Blob) {
        const file = value;
        
        // Get file data and create unique name
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileExtension = file.name.split('.').pop();
        const fileName = `uploads/${uuidv4()}.${fileExtension}`;
        
        // Set up the S3 upload parameters
        const params = {
          Bucket: bucketName,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
          // No ACL parameter as it may cause issues
        };
        
        // Upload to S3
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        
        // Add the S3 URL to the array
        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
        urls.push(fileUrl);
      }
    }
    
    if (urls.length === 0) {
      return NextResponse.json(
        { message: 'No files uploaded' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ message: 'Files uploaded', urls });
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    
    return NextResponse.json(
      { message: 'Failed to upload files', error: error.message },
      { status: 500 }
    );
  }
}