import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Use a more straightforward handler to rule out issues
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
