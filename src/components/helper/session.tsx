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
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    if (!session.user) {
      return null;
    }

    return session.user as unknown as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
