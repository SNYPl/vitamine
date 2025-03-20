import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /dashboard
  if (pathname.startsWith("/dashboard")) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Check if user is logged in and has admin access
    // You can customize this condition based on your user model
    const isAdmin = session?.email === process.env.ADMIN_EMAIL; // Set this in your .env

    if (!session || !isAdmin) {
      // Redirect to login if not authenticated or not admin
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect other authenticated routes like profile and wishlist
  if (pathname.startsWith("/profile") || pathname.startsWith("/wishlist")) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Check if the path is a protected route
  if (pathname.startsWith("/wishlist")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Redirect to login if not authenticated
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/wishlist/:path*"],
};
