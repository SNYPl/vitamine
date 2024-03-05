import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getRememberUser } from "@/components/helper/getRememberCookie";

const handler = async (req: NextRequest, res: NextResponse) => {
  const rememberMe = await getRememberUser();

  let maxAge = 30 * 60;
  if (rememberMe) {
    maxAge = rememberMe ? 30 * 24 * 60 * 60 : maxAge;
  }

  return NextAuth(
    (req as unknown) as NextApiRequest,
    (res as unknown) as NextApiResponse,
    {
      ...authOptions,
      session: { maxAge: maxAge },
    }
  );
};

export { handler as GET, handler as POST };
