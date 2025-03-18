import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Extend the User type to include role
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  // Cast the session user to our User type
  return session?.user as unknown as User | null;
}
