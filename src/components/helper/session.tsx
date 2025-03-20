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
    console.log("Fetching session...");
    // Check if NEXTAUTH_SECRET is set
    if (!process.env.NEXTAUTH_SECRET) {
      console.error("NEXTAUTH_SECRET is not defined!");
    }

    const session = await getServerSession(authOptions);
    console.log("Raw session result:", session);

    if (!session) {
      console.log("No session found at all");
      return null;
    }

    if (!session.user) {
      console.log("Session exists but has no user property");
      return null;
    }

    console.log("Session user:", session.user);

    // Cast the session user to our User type
    return session.user as unknown as User;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
