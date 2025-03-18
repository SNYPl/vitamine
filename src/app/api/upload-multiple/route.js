import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
        const fileName = `${uuidv4()}.${fileExtension}`;
        
        // Define the path to save the file
        const path = join(process.cwd(), 'public', 'uploads', fileName);
        
        // Write the file
        await writeFile(path, buffer);
        
        // Add the URL to the array
        urls.push(`/uploads/${fileName}`);
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
    console.error('Error uploading files:', error);
    
    return NextResponse.json(
      { message: 'Failed to upload files', error: error.message },
      { status: 500 }
    );
  }
}