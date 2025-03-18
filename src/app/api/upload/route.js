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
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Define the path to save the file
    const path = join(process.cwd(), 'public', 'uploads', fileName);
    
    // Write the file
    await writeFile(path, buffer);
    
    // Return the URL to the uploaded file
    const url = `/uploads/${fileName}`;
    
    return NextResponse.json({ message: 'File uploaded', url });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    return NextResponse.json(
      { message: 'Failed to upload file', error: error.message },
      { status: 500 }
    );
  }
}