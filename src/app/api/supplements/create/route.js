import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Supplement from '@/models/Vitamine';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Connect to the database
    await connectDB();
    
    // Parse the request body
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.price || !data.productQuantity) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }
    
    // Create a new supplement
    const supplement = new Supplement({
      name: data.name,
      category: data.category || [],
      infoTitle: data.infoTitle || '',
      price: data.price,
      discount: data.discount || 0,
      productQuantity: data.productQuantity,
      packageQuantity: data.packageQuantity || '',
      tabletSize: data.tabletSize || 0,
      sold: data.sold || 0,
      mainDaleOfWeek: data.mainDaleOfWeek || false,
      description: data.description || '',
      descriptionPoints: data.descriptionPoints || [],
      ingredientInfo: data.ingredientInfo || '',
      nutritionalInfo: data.nutritionalInfo || '',
      usageInfo: data.usageInfo || '',
      warningInfo: data.warningInfo || '',
      allergenInfo: data.allergenInfo || '',
      supplementInfo: data.supplementInfo || '',
      mainImage: data.mainImage || '',
      secondaryImages: data.secondaryImages || [],
      supplementFacts: data.supplementFacts || [],
      rating: data.rating || [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Save the supplement to the database
    await supplement.save();
    
    // Return a success response
    return NextResponse.json(
      { 
        message: 'Supplement created successfully',
        supplement
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating supplement:', error);
    
    return NextResponse.json(
      { message: 'Failed to create supplement', error: error.message },
      { status: 500 }
    );
  }
}