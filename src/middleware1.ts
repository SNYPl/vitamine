import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /dashboard
  if (pathname.startsWith('/dashboard')) {
    const session = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // Check if user is logged in and has admin access
    // You can customize this condition based on your user model
    const isAdmin = session?.email === process.env.ADMIN_EMAIL; // Set this in your .env
    
    if (!session || !isAdmin) {
      // Redirect to login if not authenticated or not admin
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
