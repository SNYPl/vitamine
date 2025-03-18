import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

// Get a cookie value - helper function
function getCookie(cookies: string, name: string) {
  if (!cookies) return null;
  const cookie = cookies.split(';').find(c => c.trim().startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
}

const handler = async (req: NextRequest, res: NextResponse) => {
  console.log("NextAuth handler called"); // Debug log
  
  // Get the remember me preference from the cookie
  const rememberMe = getCookie(req.headers.get('cookie') || '', 'rememberUser') === 'true';
  console.log("Remember me:", rememberMe); // Debug log

  // Set session duration - 30 days if remember me is checked, 30 minutes otherwise
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 30 * 60;

  // Create NextAuth handler with customized session max age
  const authHandler = NextAuth(
    (req as unknown) as NextApiRequest,
    (res as unknown) as NextApiResponse,
    {
      ...authOptions,
      session: {
        ...authOptions.session,
        maxAge: maxAge,
      }
    }
  );
  
  return authHandler;
};

export { handler as GET, handler as POST };
