"use server";

import { getCurrentUser } from "./session";

export const getUser = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      console.log("No user found in session");
      return null;
    }

    if (!user.email) {
      console.log("User email is missing");
      return null;
    }

    if (!process.env.API_REQUEST_URL) {
      console.error("API_REQUEST_URL is not defined in environment variables");
      return null;
    }

    const response = await fetch(
      `${process.env.API_REQUEST_URL}/api/user?email=${user.email}`,
      {
        next: { tags: ["user"] },
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(`API request failed with status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
