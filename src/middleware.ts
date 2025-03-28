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

  // Add cache control headers for dynamic routes
  const response = NextResponse.next();

  // Add cache control headers
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/shop/:path*",
    "/profile/:path*",
    "/wishlist/:path*",
    "/cart/:path*",
  ],
};
